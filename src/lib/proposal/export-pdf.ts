// Builds the proposal PDF in the browser and downloads it. Each .pp-page is
// drawn onto its own exact A4 page, so the result never depends on the
// browser's print window (paper size, margins, headers, scaling), and the rep
// gets a file in one click on a laptop or a phone. Links (call, WhatsApp,
// email, demo) are added back on top of each page so they stay tappable.
// Client only: loaded on demand from the maker.

const A4_W = 210;
const A4_H = 297;

function isSafari(): boolean {
  const ua = navigator.userAgent;
  return /Safari\//.test(ua) && !/Chrome\/|Chromium\/|Edg\//.test(ua);
}

export async function exportProposalPdf(container: HTMLElement, fileName: string): Promise<{ pages: number }> {
  const [{ toJpeg }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")]);
  await document.fonts?.ready;

  const pages = Array.from(container.querySelectorAll<HTMLElement>(".pp-page"));
  if (pages.length === 0) throw new Error("no pages to export");

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  const opts = { pixelRatio: 2, quality: 0.92, backgroundColor: "#ffffff", style: { margin: "0", boxShadow: "none" } };

  // Safari sometimes leaves images blank on the first capture: warm it up once.
  if (isSafari()) await toJpeg(pages[0], opts).catch(() => undefined);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const box = page.getBoundingClientRect();
    const data = await toJpeg(page, { ...opts, width: page.offsetWidth, height: page.offsetHeight });
    if (i > 0) pdf.addPage("a4", "portrait");
    pdf.addImage(data, "JPEG", 0, 0, A4_W, A4_H, undefined, "FAST");

    const mm = A4_W / box.width;
    for (const a of Array.from(page.querySelectorAll<HTMLAnchorElement>("a[href]"))) {
      const r = a.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      pdf.link((r.left - box.left) * mm, (r.top - box.top) * mm, r.width * mm, r.height * mm, { url: a.href });
    }
  }

  pdf.setProperties({ title: fileName, creator: "Simplified Management" });
  pdf.save(`${fileName}.pdf`);
  return { pages: pages.length };
}

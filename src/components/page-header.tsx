export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="border-b border-border bg-subtle">
      <div className="container-page py-14 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {lede && <p className="mt-5 max-w-2xl text-lg text-body">{lede}</p>}
      </div>
    </section>
  );
}

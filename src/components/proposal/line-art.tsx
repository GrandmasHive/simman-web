// Cover line art, copied from the sales decks (Media-Kit/source/kits.py,
// ART_HOTEL and ART_HOMES) so a future deck rebuild can't change proposals.
// Single weight, brand blue, no fills.

const HOTEL =
  '<path d="M10 350 H460" stroke-opacity=".35"/>' +
  '<path d="M42 350 V196 H150 V350"/>' +
  '<path d="M42 232 H150 M42 268 H150 M42 304 H150" stroke-opacity=".3"/>' +
  '<path d="M62 206 h20 v16 h-20 z M110 206 h20 v16 h-20 z" stroke-opacity=".55"/>' +
  '<path d="M62 242 h20 v16 h-20 z M110 242 h20 v16 h-20 z" stroke-opacity=".55"/>' +
  '<path d="M62 278 h20 v16 h-20 z M110 278 h20 v16 h-20 z" stroke-opacity=".55"/>' +
  '<path d="M62 314 h20 v16 h-20 z M110 314 h20 v16 h-20 z" stroke-opacity=".55"/>' +
  '<path d="M150 350 V54 H320 V350"/>' +
  '<path d="M150 96 H320 M150 138 H320 M150 180 H320 M150 222 H320 M150 264 H320 M150 306 H320" stroke-opacity=".3"/>' +
  '<path d="M172 64 h26 v22 h-26 z M222 64 h26 v22 h-26 z M272 64 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M172 106 h26 v22 h-26 z M222 106 h26 v22 h-26 z M272 106 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M172 148 h26 v22 h-26 z M222 148 h26 v22 h-26 z M272 148 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M172 190 h26 v22 h-26 z M222 190 h26 v22 h-26 z M272 190 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M172 232 h26 v22 h-26 z M222 232 h26 v22 h-26 z M272 232 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M172 274 h26 v22 h-26 z M272 274 h26 v22 h-26 z" stroke-opacity=".55"/>' +
  '<path d="M214 350 V312 a21 21 0 0 1 42 0 V350"/>' +
  '<path d="M186 306 H284"/>' +
  '<path d="M196 306 V318 M274 306 V318" stroke-opacity=".5"/>' +
  '<path d="M320 350 V228 H418 V350"/>' +
  '<path d="M320 272 H418 M320 312 H418" stroke-opacity=".3"/>' +
  '<path d="M342 238 h22 v18 h-22 z M382 238 h22 v18 h-22 z" stroke-opacity=".55"/>' +
  '<path d="M342 282 h22 v18 h-22 z M382 282 h22 v18 h-22 z" stroke-opacity=".55"/>' +
  '<path d="M342 322 h22 v18 h-22 z M382 322 h22 v18 h-22 z" stroke-opacity=".55"/>' +
  '<path d="M196 54 V32 H274 V54" stroke-opacity=".6"/>';

const HOMES =
  '<path d="M10 350 H460" stroke-opacity=".35"/>' +
  '<path d="M56 350 C56 300 60 262 68 230" stroke-opacity=".5"/>' +
  '<path d="M68 230 C48 214 26 216 14 230 M68 230 C56 206 58 184 72 170 M68 230 C88 210 110 212 122 226 M68 230 C78 204 96 190 114 190" stroke-opacity=".5"/>' +
  '<path d="M132 350 V206 L246 118 L360 206 V350"/>' +
  '<path d="M112 216 L246 112 L380 216"/>' +
  '<path d="M222 350 V286 a24 24 0 0 1 48 0 V350"/>' +
  '<path d="M166 240 h44 v38 h-44 z M282 240 h44 v38 h-44 z" stroke-opacity=".6"/>' +
  '<path d="M188 240 V278 M166 259 H210" stroke-opacity=".4"/>' +
  '<path d="M304 240 V278 M282 259 H326" stroke-opacity=".4"/>' +
  '<path d="M318 168 V128 h24 v56" stroke-opacity=".5"/>' +
  '<path d="M360 350 V252 L404 218 L448 252 V350" stroke-opacity=".55"/>' +
  '<path d="M392 350 V306 h24 v44" stroke-opacity=".45"/>' +
  '<path d="M370 268 h18 v18 h-18 z M420 268 h18 v18 h-18 z" stroke-opacity=".45"/>';

export function LineArt({ kind, width = 380 }: { kind: "hotel" | "owner"; width?: number }) {
  return (
    <svg
      viewBox="0 0 470 380"
      width={width}
      height={Math.round((width * 380) / 470)}
      fill="none"
      stroke="#2563eb"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: kind === "hotel" ? HOTEL : HOMES }}
    />
  );
}

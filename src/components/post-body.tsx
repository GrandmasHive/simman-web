import type { ReactNode } from "react";
import type { Block } from "@/lib/blog";
import { Check } from "lucide-react";

// Renders [text](https://...) inside a paragraph as a link. Everything else stays plain text.
function withLinks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a
        key={m.index}
        href={m[2]}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function PostBody({ content }: { content: Block[] }) {
  return (
    <div className="space-y-5">
      {content.map((block, i) => {
        if ("h2" in block) {
          return (
            <h2 key={i} className="pt-4 font-display text-2xl font-bold text-foreground">
              {block.h2}
            </h2>
          );
        }
        if ("ul" in block) {
          return (
            <ul key={i} className="space-y-2.5">
              {block.ul.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-body">
                  <Check className="mt-1 size-4 shrink-0 text-sync" strokeWidth={3} />
                  <span>{withLinks(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed text-body">
            {withLinks(block.p)}
          </p>
        );
      })}
    </div>
  );
}

import type { Block } from "@/lib/blog";
import { Check } from "lucide-react";

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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed text-body">
            {block.p}
          </p>
        );
      })}
    </div>
  );
}

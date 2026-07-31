"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-6 rounded-md bg-gradient-to-br from-primary to-blue-400",
        className,
      )}
      aria-hidden
    />
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold">
          <BrandMark />
          Simplified&nbsp;Management
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-body transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-body transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Button asChild className="rounded-full">
            <Link href="/demo">Request Demo</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-display">
                  <BrandMark />
                  Simplified Management
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {nav.primary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2.5 text-base font-medium text-body hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-base font-medium text-body hover:text-foreground"
                  >
                    Login
                  </Link>
                  <Button asChild className="w-full rounded-full" onClick={() => setOpen(false)}>
                    <Link href="/demo">Request Demo</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import { Button } from "antd";
import { useEffect, useState } from "react";
import Brand from "../ui/Brand";
import Icon from "../ui/Icon";
import { navigation as links } from "../../data/navigation";

export default function Header({ path = "/" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container header-inner">
        <Brand />
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="site-nav"
          aria-label="Main navigation"
          className={open ? "navigation navigation--open" : "navigation"}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                path === link.href ||
                (link.href === "/blog" && path.startsWith("/blog/"))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="header-login"
            href="https://app.simplifiedmanagement.in/login"
            onClick={() => setOpen(false)}
          >
            Login
          </a>
          <Button type="primary"
            className="button button--small"
            href="/demo"
            onClick={() => setOpen(false)}
          >
            Request Demo
          </Button>
        </nav>
      </div>
    </header>
  );
}

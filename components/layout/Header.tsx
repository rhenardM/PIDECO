"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { candidatesCta, mainNav } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { ChevronDown, Close, Menu } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Ferme les menus à chaque navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setSubmenu(null);
  }

  // Échap ferme les menus ; clic extérieur ferme le sous-menu desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSubmenu(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setSubmenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Bloque le défilement quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ferme les menus au clic sur un lien (y compris une ancre de la page courante)
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      setOpen(false);
      setSubmenu(null);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-site flex h-18 items-center justify-between gap-6 lg:h-20">
        <Logo />

        {/* Navigation desktop */}
        <nav ref={navRef} aria-label="Navigation principale" className="hidden lg:block" onClick={closeOnLink}>
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="relative">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={submenu === item.href}
                      aria-controls={`sub-${item.href}`}
                      onClick={() => setSubmenu(submenu === item.href ? null : item.href)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-forest-700 ${isActive(item.href) ? "text-forest-700" : "text-night-900"}`}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform ${submenu === item.href ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      id={`sub-${item.href}`}
                      hidden={submenu !== item.href}
                      className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white p-2 shadow-lift ring-1 ring-line"
                    >
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-forest-900 hover:bg-paper"
                      >
                        Vue d&apos;ensemble
                      </Link>
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-night-900 hover:bg-paper">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-forest-700 ${isActive(item.href) ? "text-forest-700 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-sun-400" : "text-night-900"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Link href={candidatesCta.href} className={buttonClass("primary", "!px-5 !py-2.5 whitespace-nowrap")}>
              {candidatesCta.label}
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-night-900 hover:bg-sand lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Navigation mobile — positionnée sous le header (et non en `fixed` :
          le backdrop-filter du header crée un bloc conteneur pour les éléments fixes). */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-site pt-6 pb-16" onClick={closeOnLink}>
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href} className="py-1">
                <Link href={item.href} className="block py-3 font-display text-lg font-semibold text-night-900">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-3 grid gap-1 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-1.5 text-muted">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href={candidatesCta.href} className={buttonClass("primary", "mt-6 w-full")}>
            {candidatesCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

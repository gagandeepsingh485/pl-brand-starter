import { Navbar, Publisher } from "publive-cms-sdk";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarData } from "@/lib/data/page";
import { HamburgerIcon } from "@/lib/assets/svg/hamburger";
import { CloseIcon } from "@/lib/assets/svg/close-icon";

interface HeaderProps {
  publisher: Publisher;
  navbar: Navbar[];
}

const SCROLL_THRESHOLD = 12;

const Header = ({ publisher, navbar }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const brandName = publisher.name || "Atelier";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 px-6 md:px-12 lg:px-20",
          scrolled
            ? "border-[#222]/10 bg-[#F8F7F2]/70 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] backdrop-blur-xl backdrop-saturate-150"
            : "border-[#222]/10 bg-[#F8F7F2]/95 backdrop-blur-sm"
        )}
      >
        <nav
          className="mx-auto flex min-h-[60px] max-w-[1100px] items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-serif text-2xl font-normal text-[#222]"
            aria-label="Home"
          >
            <span className="max-lg:hidden">{brandName}</span>
            <span className="hidden max-lg:inline">{brandName}</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navbar.map(({ name, link }) => (
              <Link
                key={name}
                href={link || `#${name.toLowerCase()}`}
                className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#555] transition-colors hover:text-[#222]"
              >
                {name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-[#222] outline-none transition-colors hover:bg-[#222]/5 focus-visible:ring-2 focus-visible:ring-[#222] focus-visible:ring-offset-2 lg:hidden"
            aria-label="Open menu"
          >
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-[#F8F7F2] transition-opacity duration-200 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="flex min-h-full flex-col px-6 pt-6">
          <div className="flex min-h-[56px] items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-serif text-2xl font-normal text-[#222]"
              aria-label="Home"
            >
              {brandName}
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-[#222] outline-none transition-colors hover:bg-[#222]/5 focus-visible:ring-2 focus-visible:ring-[#222] focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="border-b border-[#222]/10" />
          <ul className="flex flex-col gap-1 py-8" role="list">
            {navbar.map(({ name, link }) => (
              <li key={name}>
                <Link
                  href={link || `#${name.toLowerCase()}`}
                  onClick={closeMenu}
                  className="block py-4 text-[15px] font-medium uppercase tracking-[0.2em] text-[#555] transition-colors hover:text-[#222]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

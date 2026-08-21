"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* RIGHT FIXED SOCIAL ICONS (DESKTOP ONLY) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5">
        {[
          { href: "https://github.com/amandubey923", icon: Github },
          { href: "https://www.linkedin.com/in/aman-kr-dubey", icon: Linkedin },
          { href: "https://www.instagram.com/", icon: Instagram },
          { href: "mailto:kumaraman19137@gmail.com", icon: Mail },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              target="_blank"
              className="group relative flex items-center justify-center"
            >
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition" />
              <Icon
                size={20}
                className="relative text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110"
              />
            </Link>
          );
        })}
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border bg-background/70">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/aman.png"
              alt="Aman Dubey"
              width={36}
              height={36}
              priority
            />
            <span className="text-lg font-semibold tracking-wide">
              Aman Dubey
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm transition-all duration-300 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* DESKTOP CTA */}
          <Link
            href="/resume/Resume2.pdf"
            target="_blank"
            className="hidden md:inline-flex rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Hire Me
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-base transition ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/resume/Resume2.pdf"
                target="_blank"
                className="mt-4 inline-flex justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

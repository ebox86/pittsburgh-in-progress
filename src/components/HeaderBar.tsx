"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [{ label: "About", href: "/about" }];

type HeaderBarProps = {
  className?: string;
};

export default function HeaderBar({ className }: HeaderBarProps) {
  const classes = [className, "border-b border-[rgba(255,182,18,0.3)] bg-[#030303]/90 backdrop-blur"].filter(Boolean).join(" ");

  return (
    <header className={`${classes}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight text-[var(--color-gold)]"
        >
          <Image
            src="/logo.png"
            alt="City of Pittsburgh logo"
            width={64}
            height={64}
            className="h-full w-auto object-cover"
            priority
          />
          <span>Pittsburgh In Progress</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-gold)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

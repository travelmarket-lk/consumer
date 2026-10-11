"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/Navbar.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/rooms" },
  { label: "Destinations", href: "/destinations" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="TravelMarket" className="navbar-logo-img" />
        </Link>

        {/* DESKTOP LINKS */}
        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}

          <div className="mobile-buttons">
            <Link href="/login" className="nav-login">Sign In</Link>
            <Link href="/sign" className="nav-register">Register</Link>
          </div>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">
          <button className="nav-icon-btn" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            <span className="nav-icon-badge">0</span>
          </button>

          <Link href="/login" className="nav-login">Sign In</Link>
          <Link href="/sign" className="nav-register">Register</Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
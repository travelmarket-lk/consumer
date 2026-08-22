"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/Navbar.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M4 21h16" />
              <path d="M6 21V5l6-2 6 2v16" />
              <path d="M9 8h1" />
              <path d="M14 8h1" />
              <path d="M9 12h1" />
              <path d="M14 12h1" />
              <path d="M10 21v-5h4v5" />
            </svg>
          </div>

          <div className="navbar-brand">
            <span>Stay</span>
            <strong>Ease</strong>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/bookings">Bookings</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>

          <div className="mobile-buttons">
            <Link href="/login" className="nav-login">
              Sign In
            </Link>

            <Link href="/sign" className="nav-register">
              Register
            </Link>
          </div>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">
          <Link href="/login" className="nav-login">
            Sign In
          </Link>

          <Link href="/sign" className="nav-register">
            Register
          </Link>
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
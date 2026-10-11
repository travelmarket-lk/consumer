import Link from "next/link";
import "@/styles/Footer.css";

const BRAND_NAME = "StayEase";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

const linkGroups: FooterGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Browse rooms", href: "/rooms" },
      { label: "Destinations", href: "/destinations" },
      { label: "Deals and offers", href: "/deals" },
      { label: "Travel guides", href: "/guides" },
    ],
  },
  {
    title: "Your booking",
    links: [
      { label: "Find my booking", href: "/bookings" },
      { label: "Change or cancel", href: "/bookings/changes" },
      { label: "Payment options", href: "/help/payments" },
      { label: "Refunds", href: "/help/refunds" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Contact us", href: "/contact" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "List your hotel", href: "/partners" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand + help */}
          <div>
            <Link href="/" className="footer-brand-name">
              {BRAND_NAME}
            </Link>
            <p className="footer-tagline">
              Search, compare and book hotels in one place.
            </p>
            <p className="footer-help">
              Questions about a booking?{" "}
              <Link href="/contact">Contact support</Link>
            </p>
          </div>

          {/* Link columns */}
          <div className="footer-columns">
            {linkGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="footer-title">{group.title}</h2>
                <ul className="footer-list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="footer-legal">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
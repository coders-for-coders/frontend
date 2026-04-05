"use client";

import Link from "next/link";
import CFCLogo from "./CFCLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Discord", href: "https://discord.gg/ZVSmEAJ7fb" },
    { label: "GitHub", href: "https://github.com/coders-for-coders" },
    { label: "Our Manifesto", href: "/about" },
    { label: "Events Calendar", href: "/events" },
  ];

  const supportLinks = [
    { label: "Contact Us", href: "mailto:contact@cfc.xyz" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="w-full bg-slate-950 border-t border-purple-500/20 py-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand + Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* CFC Logo */}
              <div className="w-12 h-12 flex-shrink-0">
                <CFCLogo />
              </div>
              <span className="text-white font-bold text-lg sm:text-xl">Coders for Coders</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm font-medium">
              Bridging the gap between learning and building. A premium community built by developers, for developers. Unite, build, and evolve together.
            </p>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-base">Community</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("/") ? undefined : "_blank"}
                    rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-base font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-base">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-base font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Follow</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/coders-for-coders"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50"
                title="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.63.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/codersforcoders"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441H9.216V9.412h3.554v1.375c.427-.659 1.19-1.597 2.898-1.597 2.117 0 3.704 1.381 3.704 4.352v5.91zM5.337 8.855c-1.143 0-1.901-.755-1.901-1.697 0-.943.749-1.695 1.942-1.695 1.19 0 1.901.752 1.924 1.695 0 .942-.733 1.697-1.965 1.697zm1.586 11.597H3.73V9.412h3.193v10.64zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/coders.for.coders"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.334.012 7.053.07 2.695.272.273 2.69.07 7.052.012 8.333 0 8.756 0 12s.012 3.667.07 4.947c.203 4.358 2.625 6.78 6.987 6.983 1.281.058 1.703.07 4.947.07s3.667-.012 4.947-.069c4.358-.203 6.78-2.625 6.983-6.987.058-1.28.07-1.702.07-4.947s-.012-3.667-.069-4.947c-.203-4.357-2.625-6.78-6.987-6.983C15.667.012 15.245 0 12 0z"/>
                  <circle cx="12" cy="12" r="3.6"/>
                  <circle cx="18.406" cy="5.594" r="0.894"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-purple-500/20 pt-6">
          <p className="text-center text-gray-500 text-base font-medium">
            &copy; {currentYear} Coders for Coders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

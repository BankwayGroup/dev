// @flow strict
'use client';

import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-transparent w-full px-6 md:px-12 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-[#16f2b3] text-3xl font-extrabold tracking-wide">
            DEV ZAHIR
          </Link>
        </div>

        <ul
          id="navbar-default"
          className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 transition-all duration-300 ease-in-out md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-3 md:opacity-100"
        >
          {[
            { label: "ABOUT", href: "/#about" },
            { label: "Purchase", href: "/#packages" },
            { label: "EXPERIENCE", href: "/#experience" },
            { label: "SKILLS", href: "/#skills" },
            { label: "EXPERTISE", href: "/#education" },
            { label: "PROJECTS", href: "/#projects" },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link
                className="block px-4 py-2 no-underline outline-none transition-colors duration-300 hover:no-underline"
                href={href}
              >
                <span className="text-sm text-white hover:text-pink-600">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

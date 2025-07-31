// @flow strict
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-5 px-4 md:px-8">
        {/* Logo + Mobile Cart */}
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:space-x-6">
          <Link href="/">
            <a className="text-[#16f2b3] text-3xl font-bold">DEV ZAHIR</a>
          </Link>

          {/* Mobile-only cart icon */}
          <a
            href="/#packages"
            className="block md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#16f2b3] hover:bg-pink-600 transition-transform duration-300 hover:scale-110"
            aria-label="Packages"
          >
            <FaShoppingCart size={18} className="text-black" />
          </a>
        </div>

        <ul
          id="navbar-default"
          className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100"
        >
          <li>
            <Link href="/#about">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                ABOUT
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#experience">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                EXPERIENCE
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#skills">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                SKILLS
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#education">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                EXPERTISE
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                NEWS
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#projects">
              <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-sm text-white transition-colors duration-300 hover:text-pink-600">
                PROJECTS
              </a>
            </Link>
          </li>

          {/* Shopping Cart Icon Link */}
<li className="block">
  <a
    href="https://devzahir.com/#packages"
    className="block px-4 py-2 no-underline outline-none hover:no-underline text-white transition-colors duration-300 hover:text-pink-600 flex items-center"
  >
    <FaShoppingCart size={20} />
  </a>
</li>


        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

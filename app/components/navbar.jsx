// @flow strict
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/">
            <a className="text-[#16f2b3] text-3xl font-bold">DEV ZAHIR</a>
          </Link>
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
  <Link href="/#packages">
    <a className="block px-4 py-2 no-underline outline-none hover:no-underline text-white transition-colors duration-300 hover:text-pink-600 flex items-center">
      <FaShoppingCart size={20} />
    </a>
  </Link>
</li>


        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

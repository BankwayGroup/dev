// @flow strict
import Link from "next/link";
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5 px-4 md:px-8">
        {/* Left: DEV ZAHIR */}
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            DEV ZAHIR
          </Link>
        </div>

        {/* Right: Cart icon (mobile only) */}
        <div className="block md:hidden">
      <Link href="/#packages" aria-label="Go to Packages">
        <FaShoppingCart
          size={20} // smaller size than before
          className="text-pink-500 hover:text-pink-600 transition duration-300"
        />
      </Link>
    </div>
      </div>

      <ul
        className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100"
        id="navbar-default"
      >
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#packages">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BUY</div>
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERTISE</div>
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects">
            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

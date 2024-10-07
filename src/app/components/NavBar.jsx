'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import navbarLogo from "../assests/image/navbarLogo.png";


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => pathname === path ? 'text-[#FFDE7C]' : 'text-white';

  return (
    <div className="navmain w-full fixed h-[60px] z-[1111]  bg-[#241b6d] bg-no-repeat bg-right bg-contain mx-auto flex justify-between items-center">
      <div className="lg:hidden md:hidden p-5">
        <Link href="/">
          <Image src={navbarLogo} alt="Logo" width={0} height={40} />
        </Link>
      </div>
      <ul className="hidden mx-auto text-center md:flex space-x-20 navbar items-center">
        <li className={`hover:text-[#FFDE7C] ${isActive('/authors')} `}>
          <Link href="/authors"><i className="ifont">Authors</i></Link>
        </li>
        <li className={`hover:text-[#FFDE7C] ${isActive('/books')} `}>
          <Link href="/books"><i className="ifont">Books</i></Link>
        </li>
        <li>
          <Link href="/"><Image src={navbarLogo} alt="Logo" width={0} height={40} className="hidden md:block lg:block" /></Link>
        </li>
        <li className={`hover:text-[#FFDE7C] ${isActive('/comingsoonblogs')} `}>
          <Link href="/comingsoon"><i className="ifont">Blogs</i ></Link>
        </li>
        <li className={`hover:text-[#FFDE7C] ${isActive('/contact')} `}>
          <Link href="/contact"><i className="ifont">Contact</i ></Link>
        </li>
      </ul>
      <button
        onClick={toggleMenu}
        className="md:hidden p-5 text-white focus:outline-none"
      >
        {isOpen ? '✖' : '☰'}
      </button>
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#241b6d] text-white md:hidden">
          <ul className="p-10">
            <li className={isActive('/authors')}>
              <Link href="/authors"><em>Authors</em></Link>
            </li>
            <li className={isActive('/books')}>
              <Link href="/books"><em>Books</em></Link>
            </li>
            <li className={isActive('/comingsoonblogs')}>
              <Link href="/comingsoon"><em>Blogs</em></Link>
            </li>
            <li className={isActive('/comingsooncontactus')}>
              <Link href="/comingsoon"><em>Contact</em></Link>
            </li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default NavBar;

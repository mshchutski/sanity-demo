'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

import Logo from "@/components/Logo";
import {NAV_LINKS} from "@/utils/constants";

export default function Header(
) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <nav
        className="bg-white px-8 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <div className="md:absolute">
            <Logo/>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button data-collapse-toggle="navbar-sticky" type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky" aria-expanded="false" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mx-auto" id="navbar-sticky">
            <ul
              className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {NAV_LINKS.map(({slug, title}, index) => {
                let active = '';
                if (currentPath === '/') {
                  active = currentPath === slug ? 'text-yellow-300' : '';
                } else if (slug !== '/') {
                  active = currentPath.startsWith(slug) ? 'text-yellow-300' : ''
                }
                return (
                  <li
                    key={index}
                  >
                    <Link href={slug}
                          className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 transform-all ease-in-out duration-150 ${active}`}
                    >
                      {title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {isOpen && (
            <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
              {NAV_LINKS.map(({slug, title}, index) => {
                let active = '';
                if (currentPath === '/') {
                  active = currentPath === slug ? 'text-yellow-300' : '';
                } else if (slug !== '/') {
                  active = currentPath.startsWith(slug) ? 'text-yellow-300' : ''
                }
                return (
                  <li
                    key={index}
                    className={`px-4 text-white cursor-pointer py-1 text-2xl ${active}`}
                  >
                    <Link onClick={() => setIsOpen(!isOpen)} href={slug}>
                      {title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
)
}

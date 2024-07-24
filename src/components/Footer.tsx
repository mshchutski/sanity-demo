'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/Logo'
import { NAV_LINKS } from '@/utils/constants'

export default function Footer() {
  const currentPath = usePathname()

  return (
    <footer className="dark bg-zinc-900 mt-auto px-8 pt-20">
      <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {NAV_LINKS.map(({ slug, title }, index) => {
              let active = ''
              if (currentPath === '/') {
                active = currentPath === slug ? 'text-yellow-300' : ''
              } else if (slug !== '/') {
                active = currentPath.startsWith(slug) ? 'text-yellow-300' : ''
              }

              return (
                <li key={index}>
                  <Link
                    href={slug}
                    className={`hover:underline me-4 md:me-6 hover:text-white ${active}`}
                  >
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{' '}
          <a href="/" className="hover:underline hover:text-white">
            Testtest™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

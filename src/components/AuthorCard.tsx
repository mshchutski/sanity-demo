import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/button'
import { urlForImage } from '@/sanity/lib/sanity.image'
import { Author as AuthorType, Guide as GuideType } from '@/sanity/types'

export function AuthorCard({
  author,
  isGuide = false,
}: {
  author: AuthorType | GuideType
  isGuide?: boolean
}) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-4">
        <Link href={`/author/${author.slug.current}`}>
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={urlForImage(author.picture)
              .height(300)
              .width(300)
              .fit('crop')
              .url()}
            height={300}
            width={300}
            alt={author.picture.alt}
          />
        </Link>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {author.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {author.position}
        </span>
        <div className="flex mt-4 md:mt-6">
          <Button>
            <Link
              href={`${isGuide ? '/guide' : '/author'}/${author.slug.current}`}
            >
              More about me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

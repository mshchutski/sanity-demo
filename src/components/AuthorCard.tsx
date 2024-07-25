import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/button'
import { CustomImage } from '@/components/CustomImage'
import { Author as AuthorType, Guide as GuideType } from '@/sanity/types'
import { Routes } from '@/utils/constants'

export function AuthorCard({
  author,
  isGuide = false,
}: {
  author: AuthorType | GuideType
  isGuide?: boolean
}) {
  const linkTo =
    (isGuide ? Routes.Guide : Routes.Author) + '/' + author.slug.current

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-8">
        <Link href={linkTo}>
          <CustomImage
            image={author.picture}
            className="w-32 h-32 mb-3 rounded-full shadow-lg"
          />
        </Link>
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {author.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {author.position}
        </span>
        <div className="flex mt-4 md:mt-6">
          <Button asChild size="sm">
            <Link href={linkTo}>More about me</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

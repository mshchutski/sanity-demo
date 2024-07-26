import Link from 'next/link'
import React, { FC } from 'react'

import { CustomImage } from '@/components/CustomImage'
import { ArrowRightIcon } from '@/components/Icons'
import { Routes } from '@/utils/constants'

type ArticleAuthorCardProps = {
  author: any
}

export const ArticleAuthorCard: FC<ArticleAuthorCardProps> = ({ author }) => {
  const linkTo = Routes.Author + '/' + author.slug.current

  return (
    <div className="mx-auto grid md:grid-cols-[30%_70%] bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-lg shadow">
      <CustomImage
        className="w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        image={author.picture}
      />
      <div className="flex flex-col justify-between m-4 leading-normal">
        <Link href={linkTo}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {author.name}
          </h5>
          {author.about && (
            <p className="mb-3 font-normal text-gray-700">{author.about}</p>
          )}
          <p className="flex items-center bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600">
            More about me
            <ArrowRightIcon />
          </p>
        </Link>
      </div>
    </div>
  )
}

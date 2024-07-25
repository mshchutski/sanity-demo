'use client'

import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/button'
import { CustomImage } from '@/components/CustomImage'
import { ArrowRightIcon } from '@/components/Icons'
import { Article } from '@/sanity/types'
import { Routes } from '@/utils/constants'

export function ArticleCard({ article }: { article: Article }) {
  const linkTo = Routes.Articles + '/' + article.slug.current
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
      <Link href={linkTo}>
        <CustomImage image={article.poster} />
        <div className="p-5">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 line-clamp-1">
            {article.title}
          </h5>
          <Button
            size="sm"
            variant="ghost"
            className="bg-transparent pl-0 text-gray-500 hover:bg-transparent hover:text-yellow-300"
          >
            Read more
            <ArrowRightIcon />
          </Button>
        </div>
      </Link>
    </div>
  )
}

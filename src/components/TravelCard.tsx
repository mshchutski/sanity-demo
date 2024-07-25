import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/button'
import { CustomImage } from '@/components/CustomImage'
import { ArrowRightIcon } from '@/components/Icons'
import { Travel } from '@/sanity/types'
import { formatDate } from '@/src/utils'
import { Routes } from '@/utils/constants'

export function TravelCard({ travel }: { travel: Travel }) {
  const isPassed = new Date(travel.date) < new Date()
  const linkTo = Routes.Travels + '/' + travel.slug.current

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  overflow-hidden">
      <Link href={linkTo}>
        <CustomImage image={travel.poster} />
      </Link>
      <div className="p-5">
        <Link href={linkTo}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {travel.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {isPassed && <span className="text-red-300">took place: </span>}
          {formatDate(travel.date)}
        </p>
        <Button asChild>
          <Link href={linkTo}>
            Read more
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  )
}

import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { CustomImage } from '@/components/CustomImage'
import { HeaderBanner } from '@/components/HeaderBanner'
import { PageBreadcrumbs } from '@/components/PageBreadcrumbs'
import PageHOC from '@/components/PageHOC'
import { PortableTextComponents } from '@/components/PortableTextComponent'
import { Section } from '@/components/SectionElements'
import type { SharedPageProps } from '@/pages/_app'
import {
  getTravel,
  travelBySlugQuery,
  travelsSlugsQuery,
} from '@/sanity/lib/queries/travel'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Travel as TravelType } from '@/sanity/types'
import { Routes } from '@/utils/constants'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    travel: TravelType
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const travel = await getTravel(client, params.slug)

  if (!travel) {
    return {
      notFound: true,
    }
  }

  return { props: { draftMode, token: draftMode ? readToken : '', travel } }
}

const BREADCRUMBS = [
  { slug: Routes.Home, label: 'Home' },
  { slug: Routes.Travels, label: 'Travels' },
]

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [travel] = useLiveQuery(props.travel, travelBySlugQuery, {
    slug: props.travel.slug,
  })

  const { guide } = travel

  return (
    <PageHOC>
      <HeaderBanner poster={travel.poster} title={travel.title} />
      <div className="container">
        <div className="w-full max-w-screen-xl mx-auto">
          <PageBreadcrumbs items={[...BREADCRUMBS, { label: travel.title }]} />
        </div>
      </div>
      <div className="mx-auto max-w-screen-lg">
        <Section>
          <div className="mx-auto grid lg:grid-cols-[20%_80%] gap-10">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Activity
              </p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">
                {travel.activity}
              </h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trip Length
              </p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">
                {travel.tripLength}
              </h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Group Size
              </p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">
                {travel.groupSize}
              </h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">
                {travel.price}
              </h6>
              <div className="mb-10">
                <Link
                  className="flex items-center"
                  href={`${Routes.Guide}/${guide.slug.current}`}
                >
                  <CustomImage
                    className="rounded-full"
                    image={guide.picture}
                    height={40}
                    width={40}
                  />

                  <h5 className="text-lg ml-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {guide.name}
                  </h5>
                </Link>
              </div>
            </div>
            <div>
              <article className="prose lg:prose-lg">
                <PortableText
                  value={travel.content}
                  components={PortableTextComponents}
                />
              </article>
            </div>
          </div>
        </Section>
      </div>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(travelsSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `${Routes.Travels}/${slug}`) || [],
    fallback: 'blocking',
  }
}

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { CustomImage } from '@/components/CustomImage'
import PageHOC from '@/components/PageHOC'
import type { SharedPageProps } from '@/pages/_app'
import {
  getGuide,
  guideBySlugQuery,
  guideSlugsQuery,
} from '@/sanity/lib/queries/guide'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Guide as GuideType } from '@/sanity/types'
import { Routes } from '@/utils/constants'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    author: GuideType
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const author = await getGuide(client, params.slug)

  if (!author) {
    return {
      notFound: true,
    }
  }

  return { props: { draftMode, token: draftMode ? readToken : '', author } }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [author] = useLiveQuery(props.author, guideBySlugQuery, {
    slug: props.author.slug.current,
  })

  return (
    <PageHOC>
      <div>
        <header className="bg-gradient-to-b from-blue-800 to-slate-400 h-[22rem]" />
        <div className="container">
          <div className="w-full max-w-screen-md mx-auto -translate-y-24">
            <div>
              <CustomImage className="w-40 rounded-xl" image={author.picture} />
              <div className="flex mt-12 justify-between">
                <h5 className="text-3xl">{author.name}</h5>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">3.5k</p>
                  <p className="!text-gray-500 font-normal">Followers</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">260</p>
                  <p className="!text-gray-500 font-normal">Following</p>
                </div>
              </div>
              <div className="prose lg:prose-lg max-w-none !text-gray-500 mt-8">
                <p>{author.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(guideSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `${Routes.Guide}/${slug}`) || [],
    fallback: 'blocking',
  }
}

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import { CustomImage } from '@/components/CustomImage'
import PageHOC from '@/components/PageHOC'
import { Section } from '@/components/SectionElements'
import type { SharedPageProps } from '@/pages/_app'
import {
  authorBySlugQuery,
  authorSlugsQuery,
  getAuthor,
} from '@/sanity/lib/queries/author'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Author } from '@/sanity/types'
import { Routes } from '@/utils/constants'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    author: Author
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const author = await getAuthor(client, params.slug)

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
  const [author] = useLiveQuery(props.author, authorBySlugQuery, {
    slug: props.author.slug,
  })

  return (
    <PageHOC>
      <div>
        <header className="bg-gradient-to-b from-yellow-300 to-stone-700 h-[22rem]" />
        <div className="container">
          <div className="w-full max-w-screen-md mx-auto -translate-y-24">
            <div>
              <CustomImage className="w-40 rounded-xl" image={author.picture} />
              <div className="flex mt-12 justify-between">
                <h5 className="text-3xl">{author.name}</h5>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">
                    {author.articles.length}
                  </p>
                  <p className="!text-gray-500 font-normal">Articles</p>
                </div>
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

            <Section title="All Articles">
              <div className="mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
                {author.articles.map((article, index) => (
                  <ArticleCard article={article} key={index} />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(authorSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `${Routes.Author}/${slug}`) || [],
    fallback: 'blocking',
  }
}

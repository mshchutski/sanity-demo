import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { ArticleAuthorCard } from '@/components/ArticleAuthorCard'
import { HeaderBanner } from '@/components/HeaderBanner'
import { PageBreadcrumbs } from '@/components/PageBreadcrumbs'
import PageHOC from '@/components/PageHOC'
import { PortableTextComponents } from '@/components/PortableTextComponent'
import type { SharedPageProps } from '@/pages/_app'
import {
  articleBySlugQuery,
  articleSlugsQuery,
  getArticle,
} from '@/sanity/lib/queries/article'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Article } from '@/sanity/types'
import { formatDate } from '@/src/utils'
import { Routes } from '@/utils/constants'
import { Section } from '@/components/SectionElements'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    article: Article
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const article = await getArticle(client, params.slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return { props: { draftMode, token: draftMode ? readToken : '', article } }
}

const BREADCRUMBS = [
  { slug: Routes.Home, label: 'Home' },
  { slug: Routes.Articles, label: 'Articles' },
]

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [article] = useLiveQuery(props.article, articleBySlugQuery, {
    slug: props.article.slug,
  })

  return (
    <PageHOC>
      <HeaderBanner poster={article.poster} title={article.title} />
      <div className="container">
        <div className="w-full max-w-screen-xl mx-auto">
          <PageBreadcrumbs items={[...BREADCRUMBS, { label: article.title }]} />
        </div>
        <div className="mx-auto max-w-screen-md">
          <Section>
            <article className="prose lg:prose-lg max-w-none mb-10">
              <PortableText
                value={article.content}
                components={PortableTextComponents}
              />
              <div className="block antialiased font-sans text-base leading-relaxed text-inherit w-full md:w-10/12 font-normal !text-gray-500">
                Edited {formatDate(article._updatedAt)}
              </div>
            </article>
            <ArticleAuthorCard author={article.author} />
          </Section>
        </div>
      </div>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(articleSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `${Routes.Articles}/${slug}`) || [],
    fallback: 'blocking',
  }
}

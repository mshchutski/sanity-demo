import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import { Button } from '@/components/button'
import HeaderCarousel from '@/components/HeaderCarousel'
import PageHOC from '@/components/PageHOC'
import { Section } from '@/components/SectionElements'
import type { SharedPageProps } from '@/pages/_app'
import {
  getRecentArticles,
  recentArticlesQuery,
} from '@/sanity/lib/queries/article'
import {
  getHeaderCarousel,
  headerCarouselQuery,
} from '@/sanity/lib/queries/headerCarousel'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import type { Article, HomeCarousel } from '@/sanity/types'
import { Routes } from '@/utils/constants'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    headerCarouselItems: HomeCarousel[]
    recentArticles: Article[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const headerCarouselItems = await getHeaderCarousel(client)
  const recentArticles = await getRecentArticles(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      headerCarouselItems,
      recentArticles,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [headerCarouselItems] = useLiveQuery<HomeCarousel[]>(
    props.headerCarouselItems,
    headerCarouselQuery,
  )
  const [recentArticles] = useLiveQuery<Article[]>(
    props.recentArticles,
    recentArticlesQuery,
  )

  return (
    <PageHOC>
      <HeaderCarousel items={headerCarouselItems} />
      <div className="container">
        <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8">
          <Section title="Recent Articles">
            <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {recentArticles.map((article, index) => (
                <ArticleCard article={article} key={index} />
              ))}
            </div>
            <Button
              asChild
              className="bg-yellow-300 text-black shadow hover:bg-yellow-300/90 mt-6"
            >
              <Link href={Routes.Articles}>All articles</Link>
            </Button>
          </Section>
        </div>
      </div>
    </PageHOC>
  )
}

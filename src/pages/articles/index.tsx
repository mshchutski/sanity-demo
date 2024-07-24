'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import PageHOC from '@/components/PageHOC'
import { SharedPageProps } from '@/pages/_app'
import { articlesQuery, getAllArticles } from '@/sanity/lib/queries/article'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Article as ArticleType } from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    articles: ArticleType[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const articles = await getAllArticles(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
    },
  }
}

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [articles] = useLiveQuery<ArticleType[]>(props.articles, articlesQuery)

  return (
    <PageHOC>
      <div className="px-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <section className="mt-22 mb-12">
            <h2 className="text-3xl mt-8 mb-6 font-bold">All Articles</h2>
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
              {articles.map((article, index) => (
                <ArticleCard article={article} key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageHOC>
  )
}

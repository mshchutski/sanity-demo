import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import { ArticleCard } from '@/components/ArticleCard'
import PageHOC from '@/components/PageHOC'
import { Section } from '@/components/SectionElements'
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
    props: { draftMode, token: draftMode ? readToken : '', articles },
  }
}

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [articles] = useLiveQuery<ArticleType[]>(props.articles, articlesQuery)

  return (
    <PageHOC>
      <div className="container">
        <div className="w-full max-w-screen-xl mx-auto">
          <Section title="All Articles">
            <div className="mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
              {articles.map((article, index) => (
                <ArticleCard article={article} key={index} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </PageHOC>
  )
}

'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import PageHOC from '@/components/PageHOC'
import { TravelCard } from '@/components/TravelCard'
import { SharedPageProps } from '@/pages/_app'
import { getAllTravels, travelsQuery } from '@/sanity/lib/queries/travel'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Travel as ArticleType } from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    travels: ArticleType[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const travels = await getAllTravels(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      travels,
    },
  }
}

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [travels] = useLiveQuery<ArticleType[]>(props.travels, travelsQuery)

  return (
    <PageHOC>
      <div className="px-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <section className="mt-22 mb-12">
            <h2 className="text-3xl mt-8 mb-6 font-bold">Travels</h2>
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {travels.map((travel, index) => (
                <TravelCard travel={travel} key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageHOC>
  )
}

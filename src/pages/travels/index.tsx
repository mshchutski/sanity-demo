import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import PageHOC from '@/components/PageHOC'
import { Section } from '@/components/SectionElements'
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
    props: { draftMode, token: draftMode ? readToken : '', travels },
  }
}

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [travels] = useLiveQuery<ArticleType[]>(props.travels, travelsQuery)

  return (
    <PageHOC>
      <div className="container">
        <div className="w-full max-w-screen-xl mx-auto">
          <Section title="Travels">
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {travels.map((travel, index) => (
                <TravelCard travel={travel} key={index} />
              ))}
            </div>
          </Section>
        </div>
      </div>
    </PageHOC>
  )
}

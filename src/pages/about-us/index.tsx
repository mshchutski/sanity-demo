'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import { AuthorCard } from '@/components/AuthorCard'
import PageHOC from '@/components/PageHOC'
import { SharedPageProps } from '@/pages/_app'
import { authorsQuery, getAllAuthors } from '@/sanity/lib/queries/author'
import { getAllGuides, guidesQuery } from '@/sanity/lib/queries/guide'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { Author as AuthorType, Guide as GuideType } from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    authors: AuthorType[]
    guides: GuideType[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const authors = await getAllAuthors(client)
  const guides = await getAllGuides(client)

  console.log('guides', guides)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      authors,
      guides,
    },
  }
}

export default function AboutUsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [authors] = useLiveQuery<AuthorType[]>(props.authors, authorsQuery)
  const [guides] = useLiveQuery<GuideType[]>(props.guides, guidesQuery)

  return (
    <PageHOC>
      <div className="px-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <section className="mt-22 mb-12">
            <h2 className="text-3xl mt-8 mb-1 font-bold">Our Contributors</h2>
            <span className="italic block text-sm text-gray-500 mb-6">
              Meet the outstanding individuals responsible for bringing you the
              most compelling stories across the globe.{' '}
            </span>
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {authors.map((author, index) => (
                <AuthorCard author={author} key={index} />
              ))}
            </div>
          </section>
          <section className="mt-22 mb-12">
            <h2 className="text-3xl mt-8 mb-1 font-bold">WKND Guides</h2>
            <span className="italic block text-sm text-gray-500 mb-6">
              Meet our extraordinary travel guides. When you travel with a
              certified WKND guide you gain access to attractions and
              perspectives not found on the pages of a guide book.
            </span>
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {guides.map((author, index) => (
                <AuthorCard author={author} key={index} isGuide />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageHOC>
  )
}

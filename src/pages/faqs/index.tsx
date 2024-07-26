import { useLiveQuery } from '@sanity/preview-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

import { CollapsibleItem } from '@/components/CollapsibleItem'
import { HeaderBanner } from '@/components/HeaderBanner'
import PageHOC from '@/components/PageHOC'
import { Section } from '@/components/SectionElements'
import { SharedPageProps } from '@/pages/_app'
import { faqsPageQuery, getFaqsPageInfo } from '@/sanity/lib/queries/faqsPage'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { FaqsPage as FaqsPageType } from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    pageData: FaqsPageType
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const pageData = await getFaqsPageInfo(client)

  return {
    props: { draftMode, token: draftMode ? readToken : '', pageData },
  }
}

export default function FAQsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [pageData] = useLiveQuery<FaqsPageType>(props.pageData, faqsPageQuery)
  console.log('pageData', pageData)
  return (
    <PageHOC>
      <HeaderBanner poster={pageData.poster} title={pageData.title} />
      <div className="container">
        <div className="mx-auto max-w-screen-md grid lg:grid-cols-[80%_20%] gap-10">
          <Section>
            <div className="prose lg:prose-lg max-w-none !text-gray-500">
              <p>{pageData.about}</p>
            </div>
            <div className="mt-12 mb-12">
              {pageData.faqs.map(({ question, answer }, index) => (
                <CollapsibleItem
                  key={index}
                  question={question}
                  answer={answer}
                />
              ))}
            </div>
          </Section>
          <div className="mt-12 mb-12">
            <h4 className="text-lg font-bold tracking-tight text-gray-900 line-clamp-1">
              Need more help?
            </h4>
            <p className="mb-2 font-normal text-gray-700 text-xs">
              Give us a call at{' '}
              <a
                className="text-blue-500 hover:underline"
                href={`tel:${pageData.phone}`}
              >
                {pageData.phone}
              </a>
            </p>
            <p className="mb-2 font-normal text-gray-700 text-xs">
              E-mail us at info{' '}
              <a
                className="text-blue-500 hover:underline"
                href={`mailto:${pageData.email}`}
              >
                {pageData.email}
              </a>
            </p>
            <p className="mb-2 font-normal text-gray-700 text-xs">
              We love to talk adventures!
            </p>
          </div>
        </div>
      </div>
    </PageHOC>
  )
}

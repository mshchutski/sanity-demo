import { groq, SanityClient } from 'next-sanity'

import { FaqsPage } from '@/sanity/types'

export const faqsPageQuery = groq`*[_type == "faqsPage" && wasDeleted != true && isDraft != true][0]`

export async function getFaqsPageInfo(client: SanityClient): Promise<FaqsPage> {
  return await client.fetch(faqsPageQuery)
}

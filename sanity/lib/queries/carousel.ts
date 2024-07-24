import groq from 'groq'
import { SanityClient } from 'next-sanity'

import { cardsQuery } from '@/sanity/lib/queries/cards'

export async function getCarousel(client: SanityClient): Promise<any[]> {
  return await client.fetch(carouselQuery)
}

export const carouselQuery = groq`*[_type == "carousel"]`

import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export async function getCards(client: SanityClient): Promise<any[]> {
  return await client.fetch(cardsQuery)
}

export const cardsQuery = groq`*[_type == "card"] | order(_createdAt desc)`;

export const getCardsQuery = groq`
    *[_type == 'card']
`
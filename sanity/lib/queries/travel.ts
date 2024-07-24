import { groq, SanityClient } from 'next-sanity'

import { Travel } from '@/sanity/types'

const travelFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  _createdAt,
  poster,
  content,
  activity,
  tripLength,
  price,
  groupSize,
  "slug": slug.current,
  "guide": guide->{name, about, picture, slug},
`

export const travelBySlugQuery = groq`*[_type == "travel" && slug.current == $slug][0]{${travelFields}}`

export async function getTravel(
  client: SanityClient,
  slug: string,
): Promise<Travel> {
  return await client.fetch(travelBySlugQuery, {
    slug,
  })
}

export const travelsQuery = groq`*[_type == "travel" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)`

export async function getAllTravels(client: SanityClient): Promise<Travel[]> {
  return await client.fetch(travelsQuery)
}

export const travelsSlugsQuery = groq`
*[_type == "travel" && defined(slug.current)][].slug.current
`

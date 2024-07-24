import { groq, SanityClient } from 'next-sanity'
import { Author } from '@/sanity/types'

const authorFields = groq`
  _id,
  _updatedAt,
  _createdAt,
  _ref,
  name,
  picture,
  about,
  "slug": slug.current,
  "articles": *[_type=='article' && references(^._id)]{_id, poster, title, author, date, "slug": slug.current},
`

export const authorBySlugQuery = groq`*[_type == "author" && slug.current == $slug][0]{${authorFields}}`

export async function getAuthor(
  client: SanityClient,
  slug: string,
): Promise<Author> {
  return await client.fetch(authorBySlugQuery, {
    slug,
  })
}

export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`

export const authorsQuery = groq`*[_type == "author" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)`

export async function getAllAuthors(client: SanityClient): Promise<Author[]> {
  return await client.fetch(authorsQuery)
}

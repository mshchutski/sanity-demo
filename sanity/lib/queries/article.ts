import {groq, SanityClient} from "next-sanity";
import {Article} from "@/sanity/types";

const articleFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  _createdAt,
  poster,
  content,
  "slug": slug.current,
  "author": author->{name, about, picture, slug},
`


export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{${articleFields}}`

export async function getArticle(
  client: SanityClient,
  slug: string,
): Promise<Article> {
  return await client.fetch(articleBySlugQuery, {
    slug,
  })
}

export const recentArticlesQuery = groq`*[_type == "article" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)[0..3]`;
export const articlesQuery = groq`*[_type == "article" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)`;

export async function getRecentArticles(client: SanityClient): Promise<Article[]> {
  return await client.fetch(recentArticlesQuery)
}

export async function getAllArticles(client: SanityClient): Promise<Article[]> {
  return await client.fetch(articlesQuery)
}

export const articleSlugsQuery = groq`
*[_type == "article" && defined(slug.current)][].slug.current
`

import {groq, SanityClient} from "next-sanity";

import {Guide} from "@/sanity/types";


export const guidesQuery = groq`*[_type == "guide" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)`;

export async function getAllGuides(client: SanityClient): Promise<Guide[]> {
  return await client.fetch(guidesQuery)
}


export const guideBySlugQuery = groq`*[_type == "guide" && slug.current == $slug][0]`

export async function getGuide(
  client: SanityClient,
  slug: string,
): Promise<Guide  > {
  return await client.fetch(guideBySlugQuery, {
    slug,
  })
}


export const guideSlugsQuery = groq`*[_type == "guide" && defined(slug.current)][].slug.current`

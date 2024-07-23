import groq from 'groq';
import {SanityClient} from "next-sanity";

export async function getHeaderCarousel(client: SanityClient): Promise<any[]> {
  return await client.fetch(headerCarouselQuery)
}

export const headerCarouselQuery = groq`*[_type == "headerCarousel"] | order(_createdAt desc)`;

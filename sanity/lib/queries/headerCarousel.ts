import groq from 'groq';
import {SanityClient} from "next-sanity";

export async function getHeaderCarousel(client: SanityClient): Promise<any[]> {
  return await client.fetch(headerCarouselQuery)
}

const fields = groq`
  _id,
  _updatedAt,
  _createdAt,
  subTitle,
  "travel": travel->{title, poster, slug},
`

export const headerCarouselQuery = groq`*[_type == "homeCarousel"]{${fields}}`;

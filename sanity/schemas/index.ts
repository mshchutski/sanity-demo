import { SchemaTypeDefinition } from 'sanity'

import headerCarousel from "@/sanity/schemas/home/headerCarousel";
import articles from "@/sanity/schemas/articles";
import author from "@/sanity/schemas/author";
import travel from "@/sanity/schemas/travel";
import guide from "@/sanity/schemas/guide";

export const schemaTypes = [
  headerCarousel,
  articles,
  author,
  travel,
  guide
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}

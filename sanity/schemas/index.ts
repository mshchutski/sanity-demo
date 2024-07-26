import { SchemaTypeDefinition } from 'sanity'

import articles from '@/sanity/schemas/articles'
import author from '@/sanity/schemas/author'
import guide from '@/sanity/schemas/guide'
import headerCarousel from '@/sanity/schemas/homeHeaderCarousel'
import travel from '@/sanity/schemas/travel'
import faqsPage from '@/sanity/schemas/faqsPage'

export const schemaTypes = [
  headerCarousel,
  articles,
  author,
  travel,
  guide,
  faqsPage,
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}

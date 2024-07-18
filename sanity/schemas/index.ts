import { SchemaTypeDefinition } from 'sanity'

import card from './card'
import post from './post'

export const schemaTypes = [post, card]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}

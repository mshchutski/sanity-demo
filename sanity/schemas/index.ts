import { SchemaTypeDefinition } from 'sanity'

import post from './post'

export const schemaTypes = [post]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}

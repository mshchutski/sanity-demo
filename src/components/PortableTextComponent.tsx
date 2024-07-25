import { PortableTextReactComponents } from '@portabletext/react'
import React from 'react'

import { SanityImage } from '@/components/SanityImage'

export const PortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

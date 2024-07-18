import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { Post } from '../types'
import { dataset, projectId } from './sanity.api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Post['mainImage']) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format')
}

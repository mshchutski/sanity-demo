import Image from 'next/image'
import React, { FC } from 'react'

import { urlForImage } from '@/sanity/lib/sanity.image'

type CustomImageProps = {
  image: any
  height?: number
  width?: number
  className?: string
}

export const CustomImage: FC<CustomImageProps> = ({
  image,
  height = 300,
  width = 300,
  className = 'w-full object-cover',
}) => {
  return (
    <Image
      className={className}
      src={urlForImage(image).height(height).width(width).fit('crop').url()}
      height={height}
      width={width}
      alt={image.alt}
    />
  )
}

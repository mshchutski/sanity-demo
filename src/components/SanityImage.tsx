import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {getSanityImageConfig} from "@/sanity/lib/sanity.client";

interface Props {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props
  const imageProps = useNextSanityImage(getSanityImageConfig(), asset)

  if (!imageProps) return null

  return (
    <figure>
      <Image
        {...imageProps}
        alt={alt}
        sizes="(max-width: 800px) 100vw, 800px"
        className="mb-4 h-[28rem] w-full rounded-xl object-cover"
      />
      {caption && (
        <figcaption className="block antialiased  italic text-sm leading-normal text-inherit font-normal !text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

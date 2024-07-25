import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/carousel'
import { urlForImage } from '@/sanity/lib/sanity.image'
import { HomeCarousel } from '@/sanity/types'

export interface HeaderCarouselProps {
  items: HomeCarousel[]
}

export default function HeaderCarousel({ items }: HeaderCarouselProps) {
  return (
    <div className="relative w-full">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {items.map(({ travel, _id, subTitle }) => {
            const {
              poster: {
                crop = { left: 0, top: 0 },
                hotspot = { x: 0.5, y: 0.5 },
              },
            } = travel

            return (
              <CarouselItem
                className="relative min-h-[42rem] w-full bg-cover bg-no-repeat"
                key={_id}
                style={{
                  backgroundImage: `url(${urlForImage(travel.poster)})`,
                  backgroundPosition: `${
                    (hotspot.x - crop.left) * 100
                  }% ${(hotspot.y - crop.top) * 100}%`,
                }}
              >
                <div className="container">
                  <div className="absolute bottom-10 bg-white mx-auto px-8 py-6">
                    <h2 className="text-4xl mb-2">{travel.title}</h2>
                    <p className="mb-4">{subTitle}</p>
                    <div>
                      <Button
                        asChild
                        className="bg-yellow-300 text-black shadow hover:bg-yellow-300/90"
                      >
                        <Link href={`/travels/${travel.slug.current}`}>
                          View trip
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

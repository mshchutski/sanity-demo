import React, { FC } from 'react'

import { urlForImage } from '@/sanity/lib/sanity.image'

type HeaderBannerProps = {
  title: string
  poster: any
}

export const HeaderBanner: FC<HeaderBannerProps> = ({ title, poster }) => {
  const { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } } = poster
  return (
    <div
      className={`relative h-[32rem] w-full bg-cover bg-no-repeat`}
      style={{
        backgroundImage: `url(${urlForImage(poster)})`,
        backgroundPosition: `${
          (hotspot.x - crop.left) * 100
        }% ${(hotspot.y - crop.top) * 100}%`,
      }}
    >
      <div className="bg-gradient-to-b from-transparent to-slate-900">
        <div className="grid h-[32rem] px-8">
          <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
            <h1 className="antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-white line-clamp-2">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

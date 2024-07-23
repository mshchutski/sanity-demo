import {PortableText, PortableTextReactComponents} from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from "next/image";
import Link from "next/link";
import { useLiveQuery } from 'next-sanity/preview'
import React from "react";

import PageHOC from "@/components/PageHOC";
import {SanityImage} from "@/components/SanityImage";
import type { SharedPageProps } from '@/pages/_app'
import {getTravel, travelBySlugQuery, travelsSlugsQuery} from "@/sanity/lib/queries/travel";
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import {urlForImage} from "@/sanity/lib/sanity.image";
import {Travel as TravelType} from "@/sanity/types";

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
  travel: TravelType
},
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const travel = await getTravel(client, params.slug);

  if (!travel) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      travel,
    },
  }
}

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [travel] = useLiveQuery(props.travel, travelBySlugQuery, {
    slug: props.travel.slug,
  })

  const {
    poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
  } = travel;

  console.log("travel", travel);
  return (
    <PageHOC>
      <div
        className={`relative h-[32rem] w-full bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${urlForImage(travel.poster)})`,
          backgroundPosition: `${(hotspot.x - crop.left) *
          100}% ${(hotspot.y - crop.top) * 100}%`
        }}
      >
        <div >
          <div className="grid h-[32rem] px-8">
            <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
              <h1 className="antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-white line-clamp-2">
                {travel.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-12 pb-16 px-8">
        <div className="mx-auto max-w-screen-lg">
          <div className="mx-auto grid grid-cols-[20%_80%] gap-10">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Activity</p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">{travel.activity}</h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">Trip Length</p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">{travel.tripLength}</h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">Group Size</p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">{travel.groupSize}</h6>
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <h6 className="mb-10 text-xl font-bold text-gray-900 dark:text-white">{travel.price}</h6>
              <div className="mb-10">
                <Link
                  className="flex items-center"
                  href={`/guide/${travel.guide.slug.current}`}
                >
                  <Image
                    className="rounded-full"
                    src={urlForImage(travel.guide.picture).height(96).width(96).fit('crop').url()}
                    height={40}
                    width={40}
                    alt={travel.guide.picture.alt}
                  />
                  <h5 className="text-lg ml-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {travel.guide.name}
                  </h5>
                </Link>
              </div>
            </div>
            <div >
              <article className="prose lg:prose-lg">
                <PortableText value={travel.content} components={myPortableTextComponents} />
              </article>
            </div>
          </div>
        </div>
      </section>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(travelsSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/travels/${slug}`) || [],
    fallback: 'blocking',
  }
}

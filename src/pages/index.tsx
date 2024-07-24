import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from "next/link";
import { useLiveQuery } from 'next-sanity/preview'
import React from "react";

import {ArticleCard} from "@/components/ArticleCard";
import {Button} from "@/components/button";
import {Carousel, CarouselContent, CarouselItem} from "@/components/carousel";
import PageHOC from "@/components/PageHOC";
import type { SharedPageProps } from '@/pages/_app'
import {getRecentArticles,recentArticlesQuery} from "@/sanity/lib/queries/article";
import {getHeaderCarousel, headerCarouselQuery} from "@/sanity/lib/queries/headerCarousel";
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import {urlForImage} from "@/sanity/lib/sanity.image";
import type {Article, Article as ArticleType,HeaderCarousel as HeaderCarouselType} from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    headerCarousel: HeaderCarouselType[]
    recentArticles: Article[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const headerCarousel = await getHeaderCarousel(client);
  const recentArticles = await getRecentArticles(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      headerCarousel,
      recentArticles,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [headerCarousel] = useLiveQuery<HeaderCarouselType[]>(props.headerCarousel, headerCarouselQuery)
  const [recentArticles] = useLiveQuery<ArticleType[]>(props.recentArticles, recentArticlesQuery)

  return (
    <PageHOC>
      <section className="relative w-full">
        <Carousel opts={{ loop: true }}>
          <CarouselContent >
            {headerCarousel.map((item) => {
              const {
                poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
              } = item.travel;

              return (
                <CarouselItem className="relative min-h-[42rem] w-full bg-cover bg-no-repeat" key={item._id} style={{
                  backgroundImage: `url(${urlForImage(item.travel.poster)})`,
                  backgroundPosition: `${(hotspot.x - crop.left) *
                  100}% ${(hotspot.y - crop.top) * 100}%`,
                }}>
                  <div className="container">
                    <div className="absolute bottom-10 bg-white mx-auto px-8 py-6">
                      <h2 className="text-4xl mb-2">
                        {item.travel.title}
                      </h2>
                      <p className="mb-4">{item.subTitle}</p>
                      <div>
                        <Button asChild className="bg-yellow-300 text-black shadow hover:bg-yellow-300/90">
                          <Link href={`/travels/${item.travel.slug.current}`}>
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
      </section>
      <div className='px-8'>
        <div className='w-full max-w-screen-xl mx-auto py-4 md:py-8'>
          <section className="mt-16 mb-12">
            <h2 className="text-3xl mt-8 mb-6 font-bold">Recent Articles</h2>
            <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {recentArticles.map((article, index) => (
                <ArticleCard article={article} key={index} />
              ))}
            </div>
              <Button asChild className="bg-yellow-300 text-black shadow hover:bg-yellow-300/90 mt-6">
                <Link href={`/articles`}>
                All articles
                </Link>
              </Button>
          </section>
        </div>
      </div>
    </PageHOC>
  )
}

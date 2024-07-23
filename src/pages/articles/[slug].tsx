import {PortableText, PortableTextReactComponents} from "@portabletext/react";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from "next/image";
import Link from "next/link";
import { useLiveQuery } from 'next-sanity/preview'

import PageHOC from "@/components/PageHOC";
import {SanityImage} from "@/components/SanityImage";
import type { SharedPageProps } from '@/pages/_app'
import {articleBySlugQuery, articleSlugsQuery, getArticle} from "@/sanity/lib/queries/article";
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import {urlForImage} from "@/sanity/lib/sanity.image";
import {Article} from "@/sanity/types";
import {formatDate} from "@/src/utils";

import styles from './styles.module.css'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
  article: Article
},
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const article = await getArticle(client, params.slug);

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      article,
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
  const [article] = useLiveQuery(props.article, articleBySlugQuery, {
    slug: props.article.slug,
  })

  const {
    poster: { crop = { left: 0, top: 0 }, hotspot = { x: 0.5, y: 0.5 } }
  } = article;

  return (
    <PageHOC>
      <div
        className={`relative h-[32rem] w-full bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${urlForImage(article.poster)})`,
          backgroundPosition: `${(hotspot.x - crop.left) *
          100}% ${(hotspot.y - crop.top) * 100}%`
        }}
      >
        <div className={styles.headerContent}>
          <div className="grid h-[32rem] px-8">
            <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
              <h1 className="antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-white line-clamp-2">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-12 pb-16 px-8">
        <div className="mx-auto max-w-screen-md">
          <article className="prose lg:prose-lg max-w-none">
            <PortableText value={article.content} components={myPortableTextComponents} />
            <div className="block antialiased font-sans text-base leading-relaxed text-inherit w-full md:w-10/12 font-normal !text-gray-500" >
              Edited {formatDate(article._updatedAt)}
            </div>
          </article>
          <div className="mx-auto pb-20 pt-10">
            <div className="mt-3 rounded-2xl bg-gray-50 px-5 py-5 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <div className="mb-4 md:mb-0 md:flex items-start gap-5 max-w-2xl">
                <div className="h-full mb-3 md:mb-0 w-full max-h-[4rem] max-w-[4rem] md:max-w-[6rem] md:max-h-[6rem] rounded-lg pt-2">
                  <Image
                    className="rounded-2xl"
                    src={urlForImage(article.author.picture).height(300).width(300).fit('crop').url()}
                    height={300}
                    width={300}
                    alt={article.author.picture.alt}
                  />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-1">
                    {article.author.name}
                  </h5>
                  {article.author.about && <p className="mb-3">{article.author.about}</p>}
                  <Link
                    className="bg-brand-secondary/20 rounded-full py-2 text-sm text-blue-600 dark:text-blue-500 "
                    href={`/author/${article.author.slug.current}`}
                  >
                    More about me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(articleSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/articles/${slug}`) || [],
    fallback: 'blocking',
  }
}

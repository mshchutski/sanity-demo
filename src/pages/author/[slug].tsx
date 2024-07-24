import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import { Button } from '@/components/button'
import PageHOC from '@/components/PageHOC'
import type { SharedPageProps } from '@/pages/_app'
import {
  authorBySlugQuery,
  authorSlugsQuery,
  getAuthor,
} from '@/sanity/lib/queries/author'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import { urlForImage } from '@/sanity/lib/sanity.image'
import { Author } from '@/sanity/types'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    author: Author
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const author = await getAuthor(client, params.slug)

  if (!author) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      author,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [author] = useLiveQuery(props.author, authorBySlugQuery, {
    slug: props.author.slug,
  })

  return (
    <PageHOC>
      <div>
        <header className="bg-gradient-to-b from-yellow-300 to-stone-700 h-[22rem]" />
        <div className="px-8">
          <div className="w-full max-w-screen-md mx-auto -translate-y-24">
            <div>
              <Image
                className="w-40 rounded-xl"
                src={urlForImage(author.picture)
                  .height(300)
                  .width(300)
                  .fit('crop')
                  .url()}
                height={300}
                width={300}
                alt={author.picture.alt}
              />
              <div className="flex mt-12 justify-between">
                <h5 className="text-3xl">{author.name}</h5>
                <Button color="gray">follow</Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">323</p>
                  <p className="!text-gray-500 font-normal">Posts</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">3.5k</p>
                  <p className="!text-gray-500 font-normal">Followers</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <p className="!text-gray-900 font-bold">260</p>
                  <p className="!text-gray-500 font-normal">Following</p>
                </div>
              </div>
              <div className="prose lg:prose-lg max-w-none !text-gray-500 mt-8">
                <p>{author.about}</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl mt-8 mb-6">All Articles</h2>
              <div className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {author.articles.map((article, index) => (
                  <Link
                    key={index}
                    className="text-blue-gray-900 transition-colors hover:text-gray-800"
                    href={`/articles/${article.slug}`}
                  >
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none">
                      <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg mx-0 mt-0 mb-1">
                        <Image
                          className="h-full w-full object-cover"
                          src={urlForImage(article.poster)
                            .height(300)
                            .width(300)
                            .fit('crop')
                            .url()}
                          height={300}
                          width={300}
                          alt={article.poster.alt}
                        />
                      </div>
                      <div className="p-0">
                        <h5 className="antialiased font-sans text-md font-semibold leading-snug mb-2 pt-1 line-clamp-2 hover:underline">
                          {article.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHOC>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(authorSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/author/${slug}`) || [],
    fallback: 'blocking',
  }
}

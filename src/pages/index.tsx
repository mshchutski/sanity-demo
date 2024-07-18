import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import { Card } from '@/components/Card'
import Container from '@/components/Container'
import { PostCard } from '@/components/PostCard'
import type { SharedPageProps } from '@/pages/_app'
import { cardsQuery, getCards, getPosts, postsQuery } from '@/sanity/lib/queries'
import { readToken } from '@/sanity/lib/sanity.api'
import { getClient } from '@/sanity/lib/sanity.client'
import type { Card as CardType, Post } from '@/sanity/types'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
    cards: CardType []
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)
  const cards = await getCards(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      cards
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const [cards] = useLiveQuery<CardType[]>(props.cards, cardsQuery)

  return (
    <Container>
      <section>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </section>
    </Container>
  )
}

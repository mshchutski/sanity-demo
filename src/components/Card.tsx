import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/sanity.image'
import { Card as CardType } from '@/sanity/types'
import { formatDate } from '@/utils/index'

export function Card({ card }: { card: CardType }) {
  return (
    <div className="card">
      {card.image ? (
        <Image
          className="card__cover"
          src={urlForImage(card.image).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <h3 className="card__title">
          {card.title}
          {/* <a className="card__link" href={`/post/${card?.slug?.current}`}>
            {card.title}
          </a> */}
        </h3>
        {/* <p className="card__excerpt">{card.excerpt}</p> */}
        <p className="card__date">{formatDate(card._createdAt)}</p>
      </div>
    </div>
  )
}

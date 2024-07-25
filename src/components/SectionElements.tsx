import React, { FC } from 'react'

type SectionProps = {
  title?: string
  subTitle?: string
  children: any
}

export const Section: FC<SectionProps> = ({ title, subTitle, children }) => (
  <section className="mt-22 mb-12">
    {!!title && (
      <h2 className={`text-3xl mt-8 font-bold ${!!subTitle ? 'mb-1' : 'mb-6'}`}>
        {title}
      </h2>
    )}
    {!!subTitle && (
      <span className="italic block text-sm text-gray-500 mb-6">
        {subTitle}
      </span>
    )}
    {children}
  </section>
)

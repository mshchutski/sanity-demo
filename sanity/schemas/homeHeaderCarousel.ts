import { defineField, defineType } from 'sanity'

import Travel from '@/sanity/schemas/travel'

export default defineType({
  name: 'homeCarousel',
  title: 'Home Travels Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'travel',
      title: 'Travel',
      type: 'reference',
      to: [{ type: Travel.name }],
    }),
    defineField({
      type: 'string',
      name: 'subTitle',
      title: 'Sub Title',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'travel.title',
      media: 'travel.poster',
    },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})

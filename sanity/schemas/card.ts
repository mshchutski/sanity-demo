import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      //   options: {
      //     hotspot: true,
      //   },
    }),
    defineField({
      name: 'cta',
      title: 'Call to action button',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'href', title: 'Pathname', type: 'string' },
      ],
    }),
  ],
})

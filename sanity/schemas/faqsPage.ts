import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'faqsPage',
  title: 'FAQs Page',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      initialValue: 'FAQs',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
          initialValue: 'Image',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      title: 'Phone number',
      name: 'phone',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          name: 'item',
          type: 'object',
          title: 'FAQs item',
          fields: [
            { type: 'string', name: 'question', title: 'Question' },
            { type: 'text', name: 'answer', title: 'Answer' },
          ],
        },
      ],
    }),
  ],
})

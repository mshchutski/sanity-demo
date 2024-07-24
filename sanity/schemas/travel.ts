import { defineField, defineType } from 'sanity'
import Guide from "@/sanity/schemas/guide";

export default defineType({
  name: 'travel',
  title: 'Travel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Travel Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'guide',
      title: 'Guide',
      type: 'reference',
      to: [{ type: Guide.name }],
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alt',
          name: 'alt',
          type: 'string',
        }
      ],
    }),
    defineField({
      name: 'activity',
      type: 'string',
      title: 'Activity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tripLength',
      type: 'string',
      title: 'Trip Length',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'groupSize',
      type: 'string',
      title: 'Group size',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'string',
      title: 'Price',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'guide.name',
      date: 'date',
      media: 'poster',
    },
    prepare({ title, media, author }) {
      const subtitles = [
        author && `by ${author}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})

/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {defineConfig} from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  defineUrlResolver,
  Iframe,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '@/sanity/lib/sanity.api'
import { schema } from '@/sanity/schemas'
import {Doc} from "@sanity/mutator";
import { getClient } from './sanity/lib/sanity.client';

const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug: ['post'],
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

async function getPreviewUrl(doc: Doc, type: string) {
  return (doc?.slug as any)?.current
    ? `${
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      window.location.protocol + '//' + window.location.host
    }/${type}/${(doc?.slug as any).current}`
    : `${process.env.NEXT_PUBLIC_VERCEL_URL || window.location.host}`;
}

export default defineConfig({
  basePath: '/sanity/studio',
  name: 'project-name',
  title: 'Project Name',
  projectId,
  dataset,
  //edit schemas in '@/sanity/schemas'
  schema,
  plugins: [
    structureTool({
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        switch (schemaType) {
          case `articles`:
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: (doc: Doc) => getPreviewUrl(doc, 'articles'),
                  defaultSize: 'desktop',
                  reload: { button: true },
                  attributes: {},
                })

                .title('Preview'),
            ]);

          case `author`:
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: (doc: Doc) => getPreviewUrl(doc, 'author'),
                  defaultSize: 'desktop',
                  reload: { button: true },
                  attributes: {},
                })

                .title('Preview'),
            ]);

          case `travels`:
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: (doc: Doc) => getPreviewUrl(doc, 'travels'),
                  defaultSize: 'desktop',
                  reload: { button: true },
                  attributes: {},
                })

                .title('Preview'),
            ]);

          default:
            return S.document().views([
              // Default form view
              S.view.form(),
              // Preview
              S.view.component(Iframe).options(iframeOptions).title('Preview'),
            ]);
        }
      },
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

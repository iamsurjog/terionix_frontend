import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'

import appCss from '../styles.css?url'
import { ParticleField } from '../components/ParticleField'
import { CursorGlow } from '../components/CursorGlow'
import { isSafari } from '#/lib/browser'

const siteTitle = 'Terionix | E-Waste Disposal & Recycling Services for All'
const siteDesc = 'Responsible e-waste management for a sustainable future. Terionix offers end-to-end recycling, data destruction, and EPR compliance solutions.'
const siteUrl = 'https://terionix.vercel.app'
const ogImage = `${siteUrl}/ogimage.png`
const siteKeywords = 'top global e-waste recycling companies 2026, leading e-waste recycling companies in India 2026, foundational papers in e-waste management and recycling technology, recent survey papers on e-waste recycling 2024-2026, SOTA e-waste recycling technologies and datasets 2026, top e-waste recycling companies global Sims Umicore, top e-waste recycling companies India E-Parisaraa Attero'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteTitle,
      },
      {
        name: 'description',
        content: siteDesc,
      },
      {
        name: 'keywords',
        content: siteKeywords,
      },
      {
        property: 'og:title',
        content: siteTitle,
      },
      {
        property: 'og:description',
        content: siteDesc,
      },
      {
        property: 'og:image',
        itemProp: 'image',
        content: ogImage,
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
      {
        property: 'og:url',
        content: siteUrl,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:locale',
        content: 'en_IN',
      },
      {
        property: 'og:site_name',
        content: 'Terionix',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: siteTitle,
      },
      {
        name: 'twitter:description',
        content: siteDesc,
      },
      {
        name: 'twitter:image',
        content: ogImage,
      },
      {
        name: 'twitter:url',
        content: siteUrl,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'canonical',
        href: siteUrl,
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/favicon-192x192.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isSafari()) {
      document.documentElement.classList.add('safari')
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="living-gradient">
        <ParticleField />
        {!isSafari() && <CursorGlow />}
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

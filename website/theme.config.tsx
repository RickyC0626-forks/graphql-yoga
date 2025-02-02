/* eslint sort-keys: error */
import { useTheme, Giscus, defineConfig, Callout } from '@theguild/components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as React from 'react'

const docsRepositoryBase =
  'https://github.com/dotansimha/graphql-yoga/tree/main/website'

export default defineConfig({
  chat: {
    link: 'https://discord.gg/94CDTmgmbs',
  },
  docsRepositoryBase,
  editLink: {
    component({ children, className, filePath }) {
      const { asPath } = useRouter()

      if (asPath.startsWith('/v2')) {
        return null
      }
      return (
        <a
          className={className}
          target="_blank"
          rel="noreferrer"
          href={`${docsRepositoryBase}/${filePath}`}
        >
          {children}
        </a>
      )
    },
  },
  main({ children }) {
    const { resolvedTheme } = useTheme()
    const { route } = useRouter()

    const comments = route !== '/' && (
      <Giscus
        // ensure giscus is reloaded when client side route is changed
        key={route}
        repo="dotansimha/graphql-yoga"
        repoId="MDEwOlJlcG9zaXRvcnkxMTA4MTk5Mzk="
        category="Docs Discussion"
        categoryId="DIC_kwDOBpr6Y84CAquY"
        mapping="pathname"
        theme={resolvedTheme}
      />
    )

    return (
      <>
        {route.startsWith('/v2') && (
          <Callout type="warning">
            This is the documentation for the <b>old</b> GraphQL Yoga version 2.
            We recommend upgrading to the latest GraphQL Yoga version 4.
            <br />
            <br />
            <Link
              href="/docs/migration/migration-from-yoga-v2"
              className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
            >
              Get started with GraphQL Yoga v4
            </Link>
          </Callout>
        )}
        {route.startsWith('/v3') && (
          <Callout type="warning">
            This is the documentation for the <b>old</b> GraphQL Yoga version 3.
            We recommend upgrading to the latest GraphQL Yoga version 4.
            <br />
            <br />
            <Link
              href="/docs/migration/migration-from-yoga-v3"
              className="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]"
            >
              Get started with GraphQL Yoga v4
            </Link>
          </Callout>
        )}
        {children}
        {comments}
      </>
    )
  },
  siteName: 'YOGA',
})

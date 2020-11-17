import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import favicon from '../images/favicon.ico'
import ogimage from '../images/ogimage.png'

export function Head({
  title,
  description,
  lang = `en`,
  meta = [],
  keywords = [],
  noIndex,
  image,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )
  const hasTitle = Boolean(title)
  const pageTitle = hasTitle ? title : site.siteMetadata.title
  const pageDescription = description || site.siteMetadata.description
  const ogImageSource = `${site.siteMetadata.siteUrl}${ogimage}`
  const postImageSource = image
    ? `${site.siteMetadata.siteUrl}${image.childImageSharp.fluid.src}`
    : null
  const imageSource = postImageSource || ogImageSource
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={pageTitle}
      titleTemplate={hasTitle ? `%s | ${site.siteMetadata.title}` : `%s`}
      meta={[
        noIndex && {
          name: `robots`,
          content: `noindex`,
        },
        {
          name: `description`,
          content: pageDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: pageDescription,
        },
        {
          property: `og:image`,
          content: imageSource,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:site`,
          content: `@souporserious`,
        },
        {
          name: `twitter:card`,
          content: postImageSource ? `summary_large_image` : `summary`,
        },
        {
          property: `twitter:image`,
          content: imageSource,
        },
      ]
        .filter(Boolean)
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    >
      <link rel="icon" href={favicon} />
    </Helmet>
  )
}

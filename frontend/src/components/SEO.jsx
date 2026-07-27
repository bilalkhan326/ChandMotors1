import { useEffect } from 'react'

const SITE_NAME = 'Chand Motors G-9'
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.chandmotors.pk'
const DEFAULT_IMAGE = '/images/Tucson-transparent-1.png'

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  element.setAttribute('data-seo', 'true')
  return element
}

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  element.setAttribute('data-seo', 'true')
  return element
}

const upsertScript = (selector, content) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(content)
  element.setAttribute('data-seo-structured-data', 'true')
  element.setAttribute('data-seo', 'true')
  return element
}

const buildAbsoluteUrl = (value) => {
  if (!value) return SITE_URL
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

const SEO = ({
  title,
  description,
  keywords = [],
  canonical,
  image,
  noIndex = false,
  structuredData = null,
  type = 'website'
}) => {
  useEffect(() => {
    const head = document.head
    head.querySelectorAll('[data-seo="true"]').forEach((node) => node.remove())

    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = pageTitle

    const canonicalUrl = buildAbsoluteUrl(canonical || window.location.pathname)
    const imageUrl = buildAbsoluteUrl(image || DEFAULT_IMAGE)

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description || 'Premium vehicles, transfer services, and automotive support in G-9 Islamabad.',
    })

    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: keywords.length > 0 ? keywords.join(', ') : 'Chand Motors G-9, premium vehicles, car dealership, Islamabad'
    })

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex,nofollow' : 'index,follow'
    })

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: pageTitle
    })

    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description || 'Premium vehicles, transfer services, and automotive support in G-9 Islamabad.'
    })

    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type
    })

    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl
    })

    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl
    })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image'
    })

    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: pageTitle
    })

    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description || 'Premium vehicles, transfer services, and automotive support in G-9 Islamabad.'
    })

    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl
    })

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl
    })

    if (structuredData) {
      upsertScript('script[data-seo-structured-data="true"]', structuredData)
    }

    return () => {
      document.head.querySelectorAll('[data-seo="true"]').forEach((node) => node.remove())
    }
  }, [title, description, keywords, canonical, image, noIndex, structuredData, type])

  return null
}

export default SEO

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { jewelleryConfig } from '../config/jewellery'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Sets the document title, meta description and canonical URL for a page. */
export function useSeo(title: string, description: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    const full = title
      ? `${title} | ${jewelleryConfig.brand} Fine Jewellery`
      : `${jewelleryConfig.brand} Fine Jewellery — Jewellery That Tells Your Story`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = `${siteBase()}${pathname === '/' ? '' : pathname}`
  }, [title, description, pathname])
}

const siteBase = () => jewelleryConfig.siteUrl.replace(/\/$/, '')

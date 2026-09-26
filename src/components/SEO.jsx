import { useEffect } from 'react';

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

const BREADCRUMBS = {
  '/': [{ name: 'VaporSpace', path: '/' }],
  '/privacy': [{ name: 'VaporSpace', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }],
  '/terms': [{ name: 'VaporSpace', path: '/' }, { name: 'Terms of Service', path: '/terms' }],
  '/cookies': [{ name: 'VaporSpace', path: '/' }, { name: 'Cookie Policy', path: '/cookies' }],
};

function setMeta(selector, attr, key, content) {
  let el = document.head.querySelector(`meta[${selector}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  if (content) el.setAttribute('content', content);
}

export default function SEO({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;

    setMeta('name="description"', 'name', 'description', description);
    setMeta('property="og:title"', 'property', 'og:title', title);
    setMeta('property="og:description"', 'property', 'og:description', description);
    setMeta('property="og:url"', 'property', 'og:url', `${BASE_URL}${path}`);
    setMeta('name="twitter:title"', 'name', 'twitter:title', title);
    setMeta('name="twitter:description"', 'name', 'twitter:description', description);

    const crumbs = BREADCRUMBS[path] || [];
    if (crumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((c, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": c.name,
          "item": `${BASE_URL}${c.path}`
        }))
      };
      let script = document.getElementById('breadcrumb-schema');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'breadcrumb-schema';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(breadcrumbData);
    }
  }, [title, description, path]);

  return null;
}
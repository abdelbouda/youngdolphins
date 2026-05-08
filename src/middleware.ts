import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request, redirect, url }) => {
  const path = url.pathname;

  // Laat locale routes door
  if (
    path === '/nl' ||
    path.startsWith('/nl/') ||
    path === '/en' ||
    path.startsWith('/en/')
  ) {
    return;
  }

  // Root redirect
  if (path === '/' || path === '') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const isEnglish = acceptLanguage.toLowerCase().startsWith('en');
    return redirect(isEnglish ? '/en' : '/nl', 302);
  }
};

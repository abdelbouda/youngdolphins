import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, redirect, url }, next) => {
  const path = url.pathname;

  // Root redirect
  if (path === '/' || path === '') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const isEnglish = acceptLanguage.toLowerCase().startsWith('en');
    return redirect(isEnglish ? '/en' : '/nl', 302);
  }

  return next();
});

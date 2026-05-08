import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request, redirect, url }) => {
  const path = url.pathname;

  // Als de gebruiker al op een locale route zit → niets doen
  if (
    path === '/nl' ||
    path.startsWith('/nl/') ||
    path === '/en' ||
    path.startsWith('/en/')
  ) {
    return;
  }

  // Browsertaal detecteren
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isEnglish = acceptLanguage.toLowerCase().startsWith('en');

  const targetLocale = isEnglish ? 'en' : 'nl';

  // Query parameters behouden
  const query = url.search;

  return redirect(`/${targetLocale}${query}`, 302);
};

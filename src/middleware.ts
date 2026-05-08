import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ request, redirect, url }) => {
  // Als de gebruiker al op /nl of /en zit → niets doen
  if (url.pathname.startsWith('/nl') || url.pathname.startsWith('/en')) {
    return;
  }

  // Browser taal detecteren
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isEnglish = acceptLanguage.toLowerCase().startsWith('en');

  // Doel bepalen
  const targetLocale = isEnglish ? 'en' : 'nl';

  // Server-side redirect (onzichtbaar voor gebruiker)
  return redirect(`/${targetLocale}`, 302);
};

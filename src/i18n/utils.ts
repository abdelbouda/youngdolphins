import type { Locale, TranslationData } from './types';

// Static imports (Vite-friendly)
import enTranslations from './translations/en.json';
import nlTranslations from './translations/nl.json';

// Translation storage
const translations: Record<Locale, TranslationData> = {
  en: enTranslations,
  nl: nlTranslations
};

// No async loading needed anymore
export async function preloadTranslations(_locale?: Locale) {
  return;
}

// Helper: get nested value using dot notation
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((current, keyPart) => current?.[keyPart], obj);
}

// Sync translation function
export function tSync(locale: Locale, key: string, fallback?: string): string {
  const translation = getNestedValue(translations[locale], key);

  if (translation !== undefined) return String(translation);

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) return String(englishTranslation);
  }

  return fallback || key;
}

// Async version (optional)
export async function t(locale: Locale, key: string, fallback?: string): Promise<string> {
  return tSync(locale, key, fallback);
}

export function tArray(locale: Locale, key: string): string[] {
  const translation = getNestedValue(translations[locale], key);
  if (Array.isArray(translation)) return translation;

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (Array.isArray(englishTranslation)) return englishTranslation;
  }

  return [];
}

export function tObject<T = any>(locale: Locale, key: string): T | null {
  const translation = getNestedValue(translations[locale], key);
  if (translation && typeof translation === 'object') return translation as T;

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation && typeof englishTranslation === 'object') {
      return englishTranslation as T;
    }
  }

  return null;
}

export function hasTranslation(locale: Locale, key: string): boolean {
  const translation = getNestedValue(translations[locale], key);
  return translation !== undefined;
}

export function getAllTranslations(locale: Locale): TranslationData {
  return translations[locale];
}

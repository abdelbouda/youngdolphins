import type { Locale, TranslationData } from './types';

// Translation storage
const translations: Record<Locale, TranslationData> = {
  en: {} as TranslationData,
  nl: {} as TranslationData
};

// Lazy loading flag
let translationsLoaded = false;

// Load translation files dynamically
async function loadTranslations() {
  if (translationsLoaded) return;

  try {
    const [enTranslations, nlTranslations] = await Promise.all([
      import('./translations/en.json'),
      import('./translations/nl.json')
    ]);

    translations.en = enTranslations.default;
    translations.nl = nlTranslations.default;

    translationsLoaded = true;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

// Helper: get nested value using dot notation
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((current, keyPart) => current?.[keyPart], obj);
}

// Main translation function
export async function t(
  locale: Locale,
  key: string,
  fallback?: string
): Promise<string> {
  await loadTranslations();

  const translation = getNestedValue(translations[locale], key);

  if (translation !== undefined) {
    return String(translation);
  }

  // Fallback to English
  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) {
      return String(englishTranslation);
    }
  }

  return fallback || key;
}

// Sync version (only after preload)
export function tSync(locale: Locale, key: string, fallback?: string): string {
  if (!translationsLoaded) {
    console.warn('Translations not loaded yet, using fallback');
    return fallback || key;
  }

  const translation = getNestedValue(translations[locale], key);

  if (translation !== undefined) {
    return String(translation);
  }

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation !== undefined) {
      return String(englishTranslation);
    }
  }

  return fallback || key;
}

// Array translation
export async function tArray(locale: Locale, key: string): Promise<string[]> {
  await loadTranslations();

  const translation = getNestedValue(translations[locale], key);

  if (Array.isArray(translation)) {
    return translation;
  }

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (Array.isArray(englishTranslation)) {
      return englishTranslation;
    }
  }

  return [];
}

// Object translation
export async function tObject<T = any>(
  locale: Locale,
  key: string
): Promise<T | null> {
  await loadTranslations();

  const translation = getNestedValue(translations[locale], key);

  if (translation && typeof translation === 'object') {
    return translation as T;
  }

  if (locale !== 'en') {
    const englishTranslation = getNestedValue(translations.en, key);
    if (englishTranslation && typeof englishTranslation === 'object') {
      return englishTranslation as T;
    }
  }

  return null;
}

// Preload translations
export async function preloadTranslations(_locale?: Locale) {
  await loadTranslations();
}

// Check if key exists
export function hasTranslation(locale: Locale, key: string): boolean {
  if (!translationsLoaded) return false;

  const translation = getNestedValue(translations[locale], key);
  return translation !== undefined;
}

// Get full translation object
export async function getAllTranslations(locale: Locale): Promise<TranslationData> {
  await loadTranslations();
  return translations[locale];
}

export { loadTranslations };

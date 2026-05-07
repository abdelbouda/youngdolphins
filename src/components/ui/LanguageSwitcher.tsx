export default function LanguageSwitcher() {
  const currentLocale = Astro.currentLocale;
  const alternativeLocale = currentLocale === 'en' ? 'nl' : 'en';

  return (
    <a
      href={`/${alternativeLocale}`}
      class="text-gray-700 hover:text-[#001F3F]"
    >
      {alternativeLocale.toUpperCase()}
    </a>
  );
}

---
const locale = Astro.currentLocale;
const alternativeLocale = locale === 'en' ? 'nl' : 'en';
---

<a 
  href={`/${alternativeLocale}`} 
  class="text-gray-700 hover:text-[#001F3F]"
>
  {alternativeLocale.toUpperCase()}
</a>

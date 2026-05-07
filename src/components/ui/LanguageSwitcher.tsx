import { useState } from 'react';
import {
  switchLocale,
  getAlternativeLocale
} from '../../i18n/utils';

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  const currentLocale = Astro.currentLocale;
  const alternativeLocale = getAlternativeLocale(currentLocale);

  return (
    <div class="relative">
      <button
        class="text-gray-700 hover:text-[#001F3F]"
        onClick={() => setOpen(!open)}
      >
        {currentLocale.toUpperCase()}
      </button>

      {open && (
        <div class="absolute right-0 mt-2 bg-white border rounded shadow">
          <a
            href={switchLocale(alternativeLocale)}
            class="block px-4 py-2 hover:bg-gray-100"
          >
            {alternativeLocale.toUpperCase()}
          </a>
        </div>
      )}
    </div>
  );
}

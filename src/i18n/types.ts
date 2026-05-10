export type Locale = 'en' | 'nl';

export interface TranslationData {
  nav: {
    features: string;
    faq: string;
    cta: string;
  };
  hero: {
    badge: string;
    countdown: string;
    headline1: string;
    typewriter: string[];
    subheadline: string;
    joined_writers: string;
    stats: {
      words_written: string;
      finish_rate: string;
      writer_rating: string;
    };
    email_placeholder: string;
    cta_button: string;
    lifetime_deal: string;
    exclusive_offer: string;
    writers_count: string;
    writers_writing: string;
    genres: {
      fantasy: string;
      romance: string;
      mystery: string;
      literary: string;
    };
    continue_reading: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
  problem: {
    title: string;
    subtitle: string;
    problems: {
      distractions: {
        title: string;
        description: string;
      };
      organization: {
        title: string;
        description: string;
      };
      tracking: {
        title: string;
        description: string;
      };
    };
    solution: {
      title: string;
      description: string;
      cta: string;
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    testimonials: Array<{
      quote: string;
      author: string;
      role: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: {
      starter: {
        name: string;
        price: string;
        description: string;
        features: string[];
        cta: string;
      };
      professional: {
        name: string;
        price: string;
        period: string;
        description: string;
        badge: string;
        features: string[];
        cta: string;
      };
      team: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
    compare: {
      title: string;
      features: string[];
    };
  };
  faq: {
    title: string;
    subtitle: string;
    contact_link: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
    still_questions: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
  stats: {
    title: string;
    subtitle: string;
    numbers: {
      active_writers: string;
      words_written: string;
      novels_completed: string;
      daily_writers: string;
      average_session: string;
      longest_streak: string;
      countries: string;
    };
    success_stories: Array<{
      quote: string;
      author: string;
    }>;
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  team: {
    title: string;
    subtitle: string;
    members: Array<{
      name: string;
      role: string;
      bio: string;
    }>;
    values: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    join: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
  integrations: {
    title: string;
    subtitle: string;
    categories: {
      export: string;
      cloud: string;
      communities: string;
    };
    tools: {
      word: string;
      pdf: string;
      epub: string;
      kindle: string;
      markdown: string;
      latex: string;
      drive: string;
      dropbox: string;
      onedrive: string;
      icloud: string;
      critique: string;
      scribophile: string;
      writeon: string;
    };
    features: Array<{
      title: string;
      description: string;
    }>;
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  security: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    trust: {
      title: string;
      items: string[];
    };
    stats: {
      uptime: string;
      breaches: string;
      response: string;
    };
    commitment: {
      title: string;
      description: string;
      cta: string;
    };
  };
  footer: {
    tagline: string;
    links: {
      product: string;
      company: string;
      resources: string;
      legal: string;
    };
    copyright: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
  };
}

export type TranslationKey = keyof TranslationData;

export interface LanguageInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Record<Locale, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '�🇱'
  }
};
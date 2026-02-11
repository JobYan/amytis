import { translations, Language } from '@/i18n/translations';
import { siteConfig } from '../../site.config';

/**
 * Server-side translation helper.
 * For client components, use the `useLanguage()` hook instead.
 */
export const t = (key: keyof typeof translations.en) =>
  translations[siteConfig.i18n.defaultLocale as Language]?.[key] || translations.en[key];

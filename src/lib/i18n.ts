import { translations, Language } from '@/i18n/translations';
import { siteConfig } from '../../site.config';

/**
 * Server-side translation helper.
 * For client components, use the `useLanguage()` hook instead.
 */
export const t = (key: keyof typeof translations.en) =>
  translations[siteConfig.i18n.defaultLocale as Language]?.[key] || translations.en[key];

/**
 * Resolve a config value that may be a plain string or a locale map.
 * e.g. "Hello" or { en: "Hello", zh: "你好" }
 */
export function resolveLocale(value: string | Record<string, string>): string {
  if (typeof value === 'string') return value;
  const locale = siteConfig.i18n.defaultLocale;
  return value[locale] || value.en || Object.values(value)[0] || '';
}

'use client';

import { useLanguage } from './LanguageProvider';
import { TranslationKey } from '@/i18n/translations';
import { resolveLocaleValue } from '@/lib/i18n';

interface SimpleLayoutHeaderProps {
  title: string;
  excerpt?: string;
  titleKey?: TranslationKey;
  subtitleKey?: TranslationKey;
  titleOverride?: string | Record<string, string>;
  subtitleOverride?: string | Record<string, string>;
}

export default function SimpleLayoutHeader({ title, excerpt, titleKey, subtitleKey, titleOverride, subtitleOverride }: SimpleLayoutHeaderProps) {
  const { t, language } = useLanguage();

  const displayTitle = titleOverride
    ? resolveLocaleValue(titleOverride, language)
    : titleKey
      ? t(titleKey)
      : title;
  const displaySubtitle = subtitleOverride
    ? resolveLocaleValue(subtitleOverride, language)
    : subtitleKey
      ? t(subtitleKey)
      : excerpt;

  return (
    <header className="page-header">
      <h1 className="page-title">{displayTitle}</h1>
      {displaySubtitle && (
        <p className="page-subtitle">{displaySubtitle}</p>
      )}
    </header>
  );
}

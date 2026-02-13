'use client';

import { useLanguage } from './LanguageProvider';
import { TranslationKey } from '@/i18n/translations';

interface PageHeaderProps {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  subtitleOneKey?: TranslationKey;
  subtitleParams?: Record<string, string | number>;
  count?: number;
  className?: string;
}

export default function PageHeader({
  titleKey,
  subtitleKey,
  subtitleOneKey,
  subtitleParams,
  count,
  className,
}: PageHeaderProps) {
  const { t, tWith } = useLanguage();

  const effectiveKey = subtitleOneKey && count === 1 ? subtitleOneKey : subtitleKey;
  const subtitle = subtitleParams
    ? tWith(effectiveKey, subtitleParams)
    : t(effectiveKey);

  return (
    <header className={`page-header ${className || ''}`}>
      <h1 className="page-title">{t(titleKey)}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </header>
  );
}

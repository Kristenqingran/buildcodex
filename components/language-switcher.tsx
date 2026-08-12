import {localizePath, type Locale} from '@/i18n/routing';

export function LanguageSwitcher({locale, pathname}: {locale: Locale; pathname: string}) {
  const englishPath = pathname.replace(/^\/zh-CN(?=\/)/, '');
  const targetLocale: Locale = locale === 'en' ? 'zh-CN' : 'en';
  return (
    <a className="language-link" href={localizePath(targetLocale, englishPath)}>
      {targetLocale === 'zh-CN' ? '简体中文' : 'English'}
    </a>
  );
}

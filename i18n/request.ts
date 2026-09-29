import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {copy} from '@/lib/site-content';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as 'en' | 'zh-CN') ? (requested as 'en' | 'zh-CN') : routing.defaultLocale;
  return {locale, messages: copy[locale]};
});

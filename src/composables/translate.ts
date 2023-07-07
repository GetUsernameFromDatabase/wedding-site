import { useI18n } from 'vue-i18n';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';

export const useDynamicTranslator = () => {
  const { t } = useI18n<useI18nType>();
  return (root: AllMessageSchemaKeys, key: string) => {
    const translated = t(`${root}.${key}`);
    if (translated.startsWith(root)) return key;
    return translated;
  };
};

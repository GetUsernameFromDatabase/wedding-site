import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';

export interface AgendaItem {
  text: AllMessageSchemaKeys;
  icon: string;
  href?: string;
  slidePictures?: string[];
}

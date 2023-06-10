<template>
  <div>
    {{ t('message.devTestMessage') }}
  </div>
</template>
<script setup lang="ts">
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<useI18nType>();
</script>

<template>
  <iframe
    style="border-radius: 12px"
    :src="iframeSource"
    width="100%"
    :height="compact ? 152 : 352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    v-bind="$attrs"
  ></iframe>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Properties {
  src: string;
  useRawSrc?: boolean;
  compact?: boolean;
  noTheme?: boolean;
}
const properties = withDefaults(defineProps<Properties>(), {
  useRawSrc: false,
  compact: false,
  noTheme: false,
});

const iframeSource = computed(() => {
  if (properties.useRawSrc) return properties.src;
  const url = new URL(properties.src);
  if (!url.pathname.startsWith('/embed')) url.pathname = '/embed' + url.pathname;

  url.search = '';
  url.searchParams.set('utm_source', 'generator');
  if (properties.noTheme) url.searchParams.set('theme', '0');
  return url.toString();
});
</script>

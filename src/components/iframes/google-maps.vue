<template>
  <iframe
    :src="src"
    style="border: 0"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    v-bind="$attrs"
  ></iframe>
</template>
<script setup lang="ts">
interface Properties {
  src: string;
}
defineProps<Properties>();
</script>

<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->

<template>
  <div
    id="wrapper"
    @mousemove="
      (event) => {
        if (!torch) return;
        torch.style.top = event.pageY.toString() + 'px';
        torch.style.left = event.pageX.toString() + 'px';
      }
    "
  >
    <div class="text">
      <h1>404</h1>
      <h2>{{ t('c404.ohno') }}</h2>
      <h3>{{ t('c404.notfound') }}</h3>
    </div>
    <div ref="torch" class="torch"></div>
  </div>
</template>

<script setup lang="ts">
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<useI18nType>();
const torch = ref<HTMLDivElement>();
</script>

<style lang="scss" scoped>
#wrapper {
  height: 100%;
  background: url('https://wallpapercave.com/wp/6SLzBEY.jpg') no-repeat left top;
  background-size: cover;
  overflow: hidden;

  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.text h1 {
  color: #011718;
  margin-top: -200px;
  font-size: 15em;
  text-align: center;
  text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7), -10px 10px 0px rgba(0, 0, 0, 0.4),
    -15px 15px 0px rgba(0, 0, 0, 0.2);
  font-family: monospace;
  font-weight: bold;
}

.text h2 {
  color: black;
  font-size: 5em;
  text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
  text-align: center;
  margin-top: -150px;
  font-family: monospace;
  font-weight: bold;
}

.text h3 {
  color: white;
  margin-left: 30px;
  font-size: 2em;
  text-shadow: -5px 5px 0px rgba(0, 0, 0, 0.7);
  margin-top: -40px;
  font-family: monospace;
  font-weight: bold;
}

.torch {
  margin: -150px 0 0 -150px;
  width: 200px;
  height: 200px;
  box-shadow: 0 0 0 9999em #000000f7;
  opacity: 1;
  border-radius: 50%;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);

  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    box-shadow: inset 0 0 40px 2px #000, 0 0 20px 4px rgba(13, 13, 10, 0.2);
  }
}
</style>

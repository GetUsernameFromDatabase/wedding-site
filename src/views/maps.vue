<template>
  <div class="overflow-auto px-6 pt-2">
    <v-expansion-panels multiple v-model="panels">
      <v-expansion-panel>
        <v-expansion-panel-title
          ><div class="flex justify-center w-full">
            {{ t('maps.procession') }}
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text
          ><iframe
            ref="weddingProcession"
            class="w-full h-[60vh]"
            src="https://www.google.com/maps/embed?pb=!1m58!1m12!1m3!1d133982.73972035848!2d26.406524948373608!3d58.35156856118488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m43!3e0!4m5!1s0x46eb371e329278d3%3A0x2ae3573d643b847a!2s%C3%95nnepalee%2C%20Tiigi%2012%2C%2050410%20Tartu!3m2!1d58.3751253!2d26.714895799999997!4m5!1s0x46eb36e675ee3c2f%3A0x7594ec6944faa9de!2sTartu%20%C3%9Clikooli%20Botaanikaaed%2C%20Lai%2C%20Tartu!3m2!1d58.3848237!2d26.7213052!4m5!1s0x46eb371df3a2d013%3A0x97114f0a152653d0!2sMiina%20H%C3%A4rma%20G%C3%BCmnaasium%2C%20Jaan%20T%C3%B5nissoni%2C%20Tartu!3m2!1d58.376740899999994!2d26.709016899999998!4m5!1s0x46eb3a0f61040897%3A0x34bf7d6d4b58834f!2sEesti%20P%C3%B5llumajandusmuuseum%2C%20Muuseumi%2C%20%C3%9Clenurme%2C%20Tartu%20maakond!3m2!1d58.3184664!2d26.7211595!4m5!1s0x46eb3773d45ca6cd%3A0x78c7daf55085e04a!2sKivimi%203%2C%20R%C3%A4ni%2C%20Tartu%20maakond!3m2!1d58.3554769!2d26.669906899999997!4m5!1s0x46eb37387e08fe4f%3A0xd83cc70c4baadc4a!2sM%C3%A4rja%20Konsum%2C%20M%C3%A4rja%2C%20Tartu%20maakond!3m2!1d58.3608209!2d26.651166099999998!4m5!1s0x46eb46986d2684d5%3A0x3329dc3c4b38fc24!2sLasita%20Puhkemaja%20O%C3%9C%2C%20Kaimi%2C%20Tartu%20County!3m2!1d58.330493999999995!2d26.371049!5e0!3m2!1sen!2see!4v1686475851296!5m2!1sen!2see"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe
        ></v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title
          ><div class="flex justify-center w-full">
            {{ t('maps.ourLocation') }}
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text
          ><iframe
            ref="ourLocation"
            class="w-full h-[60vh]"
            src="https://www.google.com/maps/embed?pb=!1m58!1m12!1m3!1d133982.73972035848!2d26.406524948373608!3d58.35156856118488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m43!3e0!4m5!1s0x46eb371e329278d3%3A0x2ae3573d643b847a!2s%C3%95nnepalee%2C%20Tiigi%2012%2C%2050410%20Tartu!3m2!1d58.3751253!2d26.714895799999997!4m5!1s0x46eb36e675ee3c2f%3A0x7594ec6944faa9de!2sTartu%20%C3%9Clikooli%20Botaanikaaed%2C%20Lai%2C%20Tartu!3m2!1d58.3848237!2d26.7213052!4m5!1s0x46eb371df3a2d013%3A0x97114f0a152653d0!2sMiina%20H%C3%A4rma%20G%C3%BCmnaasium%2C%20Jaan%20T%C3%B5nissoni%2C%20Tartu!3m2!1d58.376740899999994!2d26.709016899999998!4m5!1s0x46eb3a0f61040897%3A0x34bf7d6d4b58834f!2sEesti%20P%C3%B5llumajandusmuuseum%2C%20Muuseumi%2C%20%C3%9Clenurme%2C%20Tartu%20maakond!3m2!1d58.3184664!2d26.7211595!4m5!1s0x46eb3773d45ca6cd%3A0x78c7daf55085e04a!2sKivimi%203%2C%20R%C3%A4ni%2C%20Tartu%20maakond!3m2!1d58.3554769!2d26.669906899999997!4m5!1s0x46eb37387e08fe4f%3A0xd83cc70c4baadc4a!2sM%C3%A4rja%20Konsum%2C%20M%C3%A4rja%2C%20Tartu%20maakond!3m2!1d58.3608209!2d26.651166099999998!4m5!1s0x46eb46986d2684d5%3A0x3329dc3c4b38fc24!2sLasita%20Puhkemaja%20O%C3%9C%2C%20Kaimi%2C%20Tartu%20County!3m2!1d58.330493999999995!2d26.371049!5e0!3m2!1sen!2see!4v1686475851296!5m2!1sen!2see"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe
        ></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { useI18nType } from '../plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<useI18nType>();

const weddingProcession = ref<HTMLIFrameElement>();
const ourLocation = ref<HTMLIFrameElement>();
const panels = ref<number[]>([0]);

async function fetchWeddingInfo() {
  const weddingInfoRequest = await axios.get<string>(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv',
  );
  interface RowInfo extends Array<string> {
    /**
     * Header
     */
    0: string;
    /**
     * Value
     */
    1: string;
  }

  const result: { [header: string]: string } = {};
  const infoRows = weddingInfoRequest.data.split(/\r\n|\r|\n/);
  for (const row of infoRows) {
    const rowSplit = row.split(',') as RowInfo;
    const key = rowSplit[0];
    const value = rowSplit[1];
    result[key] = value;
  }

  console.log(result);
}
// eslint-disable-next-line unicorn/prefer-top-level-await
fetchWeddingInfo();
</script>

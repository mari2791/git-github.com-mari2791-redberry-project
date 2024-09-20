<script setup>

import { onMounted, getCurrentInstance  } from 'vue';

import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import ApiService from '../api/ApiService';

const api = new ApiService('https://api.real-estate-manager.redberryinternship.ge/api');
const instance = getCurrentInstance();

onMounted(async () => {
  instance.appContext.app.axios({
  method: 'get',
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 9d0bca58-ce21-478c-8fde-b04cc13bc761'
  }
}).then(response => {
    console.log(response)
})
  
});

</script>

<template>
  
  <a href="/create-new-item">create</a>
  
</template>


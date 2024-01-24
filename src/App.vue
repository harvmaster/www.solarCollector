<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useChannelStore } from './stores/channelStore';

const route = useRoute()
const router = useRouter()
const channelStore = useChannelStore()

channelStore.loadChannels()
const defaultChannel = channelStore.channels.find(channel => channel.default)
if (defaultChannel) {
  router.push(`/${defaultChannel.id}`)
}

</script>
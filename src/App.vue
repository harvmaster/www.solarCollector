<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useChannelStore } from './stores/channelStore';

const router = useRouter()
const channelStore = useChannelStore()

channelStore.loadChannels()
const defaultChannel = channelStore.channels.find(channel => channel.default)
if (defaultChannel) {
  router.push(`/${defaultChannel.id}`)
} else {
  router.push('/')
}

</script>
./stores/channelStore
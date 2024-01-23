<template>
  <q-page class="column q-pa-md justify-start">
    <div class="col-auto text-center">
      <div class="text-h1 text-amber-8">Solr</div>
      <div class="text-h5 text-grey-5">A data visualiser for solar power systems</div>
    </div>
    <div class="col row justify-center">
      <div class="col-12 col-md-4 column justify-center">
        <span class="col-auto text-center text-h5 text-grey-5">Channel ID</span>
        <q-input class="col-auto" filled bg-color="blue-grey-7" color="amber-8" v-model="channel.id" />

        <div class="col-auto text-center text-h5 text-grey-5">Password</div>
        <q-input class="col-auto" filled bg-color="blue-grey-7" color="amber-8" v-model="channel.password" type="password" />

        <div class="col-auto row">
          <div class="col-auto">
            <q-checkbox v-model="channel.remember" color="amber-8" />
          </div>
          <div class="col-auto">
            <span class="text-h6 text-grey-5">Remember Channel</span>
          </div>
        </div>

        <div class="col-auto row justify-center">
          <q-btn class="col-auto" color="amber-8" label="Connect" @click="connect" />
        </div> 
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useChannelStore } from 'src/stores/channelStore';

const router = useRouter()
const channelStore = useChannelStore()

const channel = ref({
  id: '',
  password: '',
  remember: true
})

const connect = () => {
  channelStore.storeChannel({
    id: channel.value.id,
    password: channel.value.password,
    default: true
  })

  router.push(`/${channel.value.id}`)
}

</script>src/stores/channelStore
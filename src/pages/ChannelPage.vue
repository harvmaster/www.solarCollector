<template>
  <q-page class="column items-center q-py-sm">
    <!-- Battery -->
    <div class="col full-width widget row">
      <div class="bg-green-3 col-12 row items-center justify-center">
        <div class="col-auto justify-center">
          <q-icon name="battery_charging_full" size="100px" color="white" />
        </div>
        <div class="col-auto column justify-center">
          <div class="col-auto text-h2 text-white">{{ state.battery }}%</div>
          <div class="col-auto text-h4 text-white">{{ state.batteryVoltage.toPrecision(4) }}v</div>
        </div>
      </div>
    </div>

    <!-- Solar Input -->
    <div class="col full-width widget row">
      <div class="bg-amber-3 col-12 row items-center justify-center">
        <div class="row items-center justify-center">
          <div class="col-auto justify-center animate-sun">
            <q-icon name="wb_sunny" size="100px" color="white" />
          </div>
          <div class="col-auto justify-center q-pl-md">
            <div class="text-h2 text-white">{{ Math.floor(state.solar) }}W</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Consumption -->
    <div class="col full-width widget row">
      <div class="bg-blue-3 col-12 row items-center justify-center">
        <div class="row items-center justify-center">
          <div class="col-auto justify-center">
            <q-icon name="power" size="100px" color="white" />
          </div>
          <div class="col-auto justify-center">
            <div class="text-h2 text-white">{{ Math.floor(state.consumption) }}W</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.widget {
  padding: 0.5em 1em;
  max-width: 40em;
}
.widget > div {
  border-radius: 1em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  padding: 1em;
}
.animate-sun {
  animation: rotate 5s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useChannelStore } from 'src/stores/channelStore';
import { Notify } from 'quasar';
import Socket from 'socket.io-client'

const router = useRouter()
const channelStore = useChannelStore()

const state = ref({
  solar: 0,
  consumption: 0,
  battery: 0,
  batteryVoltage: 0
})

const connectSocket = (id: string, password: string) => {
  const socket = Socket('https://api.solar.mc.hzuccon.com');

  socket.on('connect', () => {
    console.log('connected to Solar API');
  });

  socket.emit('join', {
    clientType: 'consumer',
    data: {
      channelId: id,
      password: password
    }
  })

  socket.on('error', (data) => {
    console.log(data);
    Notify.create({
      message: data.error,
      color: 'red-8',
      textColor: 'white',
      icon: 'error',
      position: 'bottom'
    })
    router.push('/')
  })

  socket.on('update', (data) => {
    state.value = { ...state.value, ...data }
  });
  
  socket.on('joined', msg => {
    state.value = { ...msg.state }
  })
}

const getChannelInfo = () => {
  const channelId = router.currentRoute.value.params.channel
  console.log(channelId)

  const channel = channelStore.channels.find(channel => channel.id === channelId)
  if (!channel && channelId == 'demo') {
    return connectSocket('demo', 'demo')
  }

  if (channel) {
    connectSocket(channel.id, channel.password)
  } else {
    router.push('/')
  }
}

onMounted(() => {
  getChannelInfo()
})
</script>
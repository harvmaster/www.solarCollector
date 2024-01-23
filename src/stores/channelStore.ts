import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

interface Channel {
  id: string;
  password: string;
  default: boolean;
}

export const useChannelStore = defineStore('channel', {
  state: (): { channels: Channel[] } => ({
    channels: [],
  }),
  getters: {
    // removeChannel: (state) => (id: string) => {
    //   state.channels = state.channels.filter((channel: Channel) => channel.id !== id)
    // }
  },
  actions: {
    storeChannel(channel: Channel) {
      this.channels.push(channel)
      LocalStorage.set('channels', this.channels)
    },
    loadChannels() {
      this.channels = LocalStorage.getItem('channels') || []
    }
  },
});

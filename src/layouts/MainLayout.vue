<template>
  <q-layout view="lHh Lpr lFf" class="bg-blue-grey-9">
    <q-header elevated class="bg-blue-grey-10">
      <q-toolbar>

        <q-toolbar-title>
          <q-btn flat label="Solr" @click="toHome" no-caps />
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>


    <q-footer>
      <q-toolbar>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const toHome = () => {
  router.push('/')
}

</script>

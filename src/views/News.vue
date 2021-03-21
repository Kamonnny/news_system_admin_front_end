<template>123</template>

<script lang=ts>
import { defineComponent, onMounted } from 'vue'
import requests from '@/lib/requests'
import axios from 'axios'

export default defineComponent({
  name: 'News',
  setup() {
    onMounted(async () => {
      const data = await requests.post('/oauth', {username: 'Eachin',password: '12345'})
      console.log(data)
    })
  },
})
</script>

<style>
</style>

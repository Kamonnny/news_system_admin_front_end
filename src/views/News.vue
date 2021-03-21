<template>123</template>

<script lang=ts>
import { defineComponent, onMounted } from 'vue'
import requests from '@/lib/requests'

export default defineComponent({
  name: 'News',
  setup() {
    onMounted(async () => {
      const data = await requests({ url: '/oauth', method: 'post' })
      console.log(data)
    })
  },
})
</script>

<style>
</style>
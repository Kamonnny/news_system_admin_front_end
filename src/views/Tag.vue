<template>
  {{ tags }}
</template>

<script lang=ts>
import { defineComponent, onMounted, ref } from 'vue'
import { getTags } from '@/api/tag'

interface Tags {
  tag: string
  tag_id: number
  create_time: string
  update_time: string
}

export default defineComponent({
  name: 'Tag',
  setup() {
    const tags = ref<Tags[]>([])

    onMounted(async () => {
      const data = await getTags()
      tags.value = data.items
    })

    return { tags }
  },
})
</script>

<style>
</style>

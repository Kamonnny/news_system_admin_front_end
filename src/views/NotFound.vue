<template>
  <a-result status="404" title="404" sub-title="啊！页面呢？！！！">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Result } from 'ant-design-vue'

export default defineComponent({
  name: 'NotFound',
  components: {
    [Result.name]: Result,
  },
})
</script>

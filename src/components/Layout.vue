<template>
  <a-spin size="large" :spinning="spinning">
    <a-layout v-if="!spinning">
      <a-layout-sider
        class="my-sider"
        breakpoint="lg"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
      >
        <div style="text-align: center">
          <div :class="{ logo: !collapsed, 'collapsed-logo': collapsed }">
            <img
              alt="logo"
              src="//static.ek-studio.cn/private/eachin/image/zhutou.png"
              style="height: 28px"
            />
            <span class="logo-title" v-if="!collapsed">猪猪新闻</span>
          </div>
        </div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
          <a-menu-item key="/news" @click="redirect">
            <ReadOutlined />
            <span>新闻</span>
          </a-menu-item>
          <a-menu-item key="/tag" @click="redirect">
            <TagsOutlined />
            <span>标签</span>
          </a-menu-item>
          <a-menu-item key="/comment" @click="redirect">
            <CommentOutlined />
            <span>评论</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout id="main-layout">
        <a-layout-header class="my-header">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />

          <a-dropdown>
            <a> {{ username }}&nbsp;<DownOutlined /> </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="logout">退出</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-layout-header>

        <a-config-provider :locale="locale">
          <router-view />
        </a-config-provider>

        <!-- 下方版权信息 -->
        <a-layout-footer class="my-footer">
          Copyright © 2021 Stupid Pig
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <div v-else style="height: 100vh; width: 100vw"></div>
  </a-spin>
</template>

<script lang="ts">
import {
  ReadOutlined,
  TagsOutlined,
  CommentOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref, onMounted, computed } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { getUsers } from '@/api/users'

import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({
  components: {
    ReadOutlined,
    TagsOutlined,
    CommentOutlined,
    DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const locale = ref(zhCN)

    const spinning = ref(true)
    const selectedKeys = ref([route.meta.selectedKey])

    const logout = () => {
      store.commit('upAccessToken', null)
      localStorage.clear()
      location.href = '/login'
    }

    onMounted(async () => {
      spinning.value = true
      const data = await getUsers()
      store.commit('upUser', data)
      spinning.value = false
    })

    return {
      locale,
      logout,
      spinning,
      selectedKeys,
      collapsed: ref(false),
      username: computed(() => store.state.username),
      redirect: ({ key }: any) => router.push(key),
    }
  },
})
</script>

<style lang="less" >
.my-sider {
  overflow: auto;
  height: 100vh;

  .trigger {
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 30px;
    margin-left: 24px;
    margin-top: 17px;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    .logo-title {
      margin-bottom: 0;
      padding-left: 12px;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
    }
  }

  .collapsed-logo {
    margin-top: 18px;
    margin-bottom: 16px;
    height: 30px;
  }
}

#main-layout {
  height: 100vh;
  overflow: auto;

  .my-header {
    background: #fff;
    padding: 0 15px;
    height: 48px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: rgba(0, 0, 0, 0.65);
      margin-right: 14px;
    }
  }

  .my-footer {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    padding-top: 30px;
    user-select: none;
  }
}
</style>

<template>
  <a-layout>
    <a-layout-sider
      class="my-sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">
        <img
          alt="logo"
          src="https://static.ek-studio.cn/private/eachin/image/zhutou.png"
          style="height: 28px"
        />
        <span class="logo-title" v-if="!collapsed">猪猪新闻</span>
      </div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <ReadOutlined />
          <span>新闻</span>
        </a-menu-item>
        <a-menu-item key="2">
          <TagsOutlined />
          <span>标签</span>
        </a-menu-item>
        <a-menu-item key="3">
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
      </a-layout-header>

      <a-page-header
        v-if="$route.meta.showPageHeader"
        :title="$route.meta.title"
        :sub-title="$route.meta.subTitle"
        style="background: #fff"
        @back="() => $router.go(-1)"
      />

      <a-config-provider :locale="locale">
        <div class="main-container">
          <router-view />
        </div>
      </a-config-provider>

      <!-- 下方版权信息 -->
      <a-layout-footer class="my-footer">
        Copyright © 2021 Stupid Pig
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  ReadOutlined,
  TagsOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({
  components: {
    ReadOutlined,
    TagsOutlined,
    CommentOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    const locale = ref(zhCN)
    return {
      locale,
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
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

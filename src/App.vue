<script setup>
import { reactive, ref } from 'vue';
import Between from './layouts/Between.vue';
import { Icon } from '@iconify/vue'
import Block from './layouts/Block.vue'
import Experience from './components/Experience.vue'
import List from './components/List.vue';
import * as string from 'lodash/string'
import Panel from './components/Panel.vue'
import { useItemsStore } from './stores/ItemsStore';
import { NMessageProvider } from 'naive-ui';

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const ProgramLang = reactive({
  en: {
    title: 'PROGRAM SKILLS',
    languages: 'Languages',
    framework: 'Framework',
    tool:'Tools'
  },
  zh: {
    title: '编程相关',
    languages: '编程语言',
    framework: '框架 / 引擎',
    tool:'工具'
  },
  langs: [
    'JavaScript',
    'Python',
    'C++',
    'TypeScript',
    '...'
  ],
  frameworks: [
    'Vue3',
    'Django',
    'Cocos Creator',
    'Node',
    'Deno',
    'TailWind',
    '...'
  ],
  tools:[
    'VSCode',
    'Git',
    'Vite'
  ]
})

const Course = reactive({
  en:{
    title:'Featured Courses'
  },
  zh:{
    title:'专业课程'
  }
})

const itemsStore = useItemsStore()

</script>

<template>
<n-message-provider>

  <Panel></Panel>
  <div class="main-page relative">
    <div class="sub-page relative" :class="itemsStore.lang == 'zh' ? 'font-sans' : 'font-serif'">
      <!-- title -->
      <Between class="text-xl">
        <div class="font-bold text-2xl">{{ itemsStore.getTitle.name }}</div>
        <!-- email -->
        <div class="flex items-center">
          <Icon icon="mdi:email-outline" />{{ itemsStore.getTitle.mail }}:{{itemsStore.emailNumber}}
        </div>
      </Between>

      <Between>
        <a href="https://gitee.com/Xu-pixel" class="text-green-700">{{itemsStore.page}}</a>
        <div class="flex items-center">
          <Icon icon="mdi:phone" />{{ itemsStore.getTitle.phone }}:{{itemsStore.phoneNumber}}
        </div>
      </Between>

    <TransitionGroup name="list">
      <Block v-for="(content,i) in itemsStore.getContents" :title="content.title" :key="i" class="bg-white">
        <Experience v-for="(v,listId) in content.list" v-bind="v" :details="itemsStore.getDetails(i,listId)"></Experience>
      </Block>
    </TransitionGroup>
    </div>
  </div>

      </n-message-provider>
</template>

<style >
.btn {
  @apply bg-green-700 text-white p-2 rounded-lg m-2
}
</style>

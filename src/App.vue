<script setup>
import { computed } from 'vue';
import Between from './layouts/Between.vue';
import { Icon } from '@iconify/vue'
import Block from './layouts/Block.vue'
import Experience from './components/Experience.vue'
import Panel from './components/Panel.vue'
import { useItemsStore } from './stores/ItemsStore';
import { NMessageProvider } from 'naive-ui';
import { useTitle } from '@vueuse/core'


const itemsStore = useItemsStore()

useTitle(computed(() => {
  return `Resume Generator For ${itemsStore.getTitle.name}`
})) 

</script>

<template>
<n-message-provider>
  <Panel></Panel>
  <div class="main-page scale-75 xl:scale-100 absolute xl:right-0 xl:top-0 m-4 -right-20 -top-28">
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

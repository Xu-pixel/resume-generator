<template>
  <div
    class="fixed h-screen xl:w-128 w-96 left-0 print:hidden overflow-auto scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin">
    <div class="flex items-center w-full gap-4 sticky top-0 bg-white px-4 py-2 z-10 rounded-lg shadow-md">
      <select v-model="items.lang">
        <option v-for="{ value, display } in items.languages" :value="value">
          {{ display }}
        </option>
      </select>
      <Tool @callback="printPDF" icon="mdi:printer">
        打印
      </Tool>
      <Tool @callback="save" icon="mdi:content-save">
        保存
      </Tool>
      <Tool @callback="items.$reset()" icon="mdi:restart-alert">
        重置
      </Tool>
      <Tool @callback="restore" icon="mdi:restore">
        撤销
      </Tool>
    </div>

    <!-- 基本信息 -->

    <div class="grid grid-cols-1 p-4 items-center xl:grid-cols-2">
      name: <input v-model="items.getTitle.name" class="hover:border-green-700 inputBox">
      mail: <input v-model="items.getTitle.mail" class="hover:border-green-700 inputBox">
      phone: <input v-model="items.getTitle.phone" class="hover:border-green-700 inputBox">

      phoneNumber: <input v-model="items.phoneNumber" class="hover:border-green-700 inputBox">
      page: <input v-model="items.page" class="hover:border-green-700 inputBox">
      emailNumber: <input v-model="items.emailNumber" class="hover:border-green-700 inputBox">
    </div>


    <NCollapse class="p-2 text-lg select-none">
      <TransitionGroup name="list">
        <div v-for="(content, i) in items.getContents" :key="i"
          class="p-2 pb-4 flex rounded-lg group relative hover:bg-slate-50 bg-white flex-col">
          <NCollapseItem class="mt-2">
            <template #header>
              <input v-model="content.title" class=" outline-none rounded-lg hover:border-green-700 border px-2">
            </template>

            <!-- content -->
            <TransitionGroup name="list">
              <div v-for="(v, listId) in content.list" :key="listId"
                class="hover:bg-slate-100 p-2 rounded-lg w-11/12 relative group-child">
                <NCollapseItem>
                  <template #header>
                    <input v-model="v.name" class=" outline-none rounded-lg hover:border-green-700 border px-2">
                  </template>
                  <div class="grid xl:grid-cols-2 items-center grid-cols-1">
                    period: <input v-model="v.period" class="hover:border-green-700 inputBox">
                    location: <input v-model="v.location" class="hover:border-green-700 inputBox">
                    intro: <textarea v-model="v.intro" class="hover:border-green-700 inputBox" />
                    link: <input v-model="v.link" class="hover:border-green-700 inputBox">
                    <Icon icon="mdi:plus" @click.prevent="items.createDetail(i, listId)"
                      v-if="items.getDetailsLength(i, listId) === 0"
                      class=" cursor-pointer text-slate-400 group-child-hover:block hidden w-5 h-5" />
                  </div>

                  <!-- details -->
                  <div v-for="( detail, detailId ) in v.details"
                    class="relative group-grandson hover:bg-slate-200 p-2 rounded-lg w-full">
                    <div class="grid xl:grid-cols-2 items-center grid-cols-1">
                      bold:<input v-model="detail.bold" class="hover:border-green-700 inputBox">
                      text: <input v-model="detail.text" class="hover:border-green-700 inputBox">
                    </div>
                    <div class="flex justify-end gap-2 items-center">
                      <Icon icon="mdi:plus" @click.prevent="items.createDetail(i, listId)"
                        v-if="items.getDetailsLength(i, listId) === detailId + 1"
                        class=" cursor-pointer text-slate-400 group-child-hover:block hidden w-5 h-5" />
                      <Icon icon="maki:cross" @click.prevent="items.deleteDetail(i, listId, detailId)"
                        class=" cursor-pointer text-slate-400 group-grandson-hover:block hidden w-5 h-5" />
                    </div>
                  </div>

                </NCollapseItem>

                <Icon icon="maki:cross" @click.prevent="items.deleteList(i, listId)"
                  class=" cursor-pointer text-slate-400 group-child-hover:block hidden absolute right-2 top-4" />

              </div>
            </TransitionGroup>

            <Icon icon="mdi:plus"
              class=" bg-slate-100 w-full mt-1 h-8 m-auto cursor-pointer text-slate-300 transition-all duration-200 hover:bg-slate-200 rounded-lg"
              @click="items.createList(i)" />
          </NCollapseItem>

          <Icon icon="maki:cross" @click.prevent="items.deleteContents(i)"
            class=" cursor-pointer text-slate-400 group-hover:block hidden absolute right-2 top-4" />
          <Icon icon="material-symbols:arrow-upward" @click.prevent="items.swapContents(i, i - 1)" v-if="i !== 0"
            class=" cursor-pointer text-slate-400 group-hover:block hidden absolute right-10 top-4" />
        </div>
      </TransitionGroup>
    </NCollapse>

    <!-- 添加项目 -->
    <Icon icon="mdi:plus"
      class="rounded-full bg-slate-200 w-10 h-10 m-auto cursor-pointer text-slate-300 scale-75 hover:scale-100 transition-all duration-200 hover:text-slate-400"
      @click="items.createContents()" />
  </div>
</template>


<script setup>
import { useItemsStore } from '../stores/ItemsStore.js';
import { NCollapse, NCollapseItem, useMessage } from 'naive-ui'
import { Icon } from '@iconify/vue';
import Tool from './Tool.vue';

const items = useItemsStore()
const message = useMessage()
const printPDF = window.print
const history = []

items.$state = JSON.parse(localStorage.getItem('items'))

const save = () => {
  try {
    localStorage.setItem('items', JSON.stringify(items.$state))
  } catch (e) {
    message.error(e)
  }
  message.success('本地保存成功')
}



items.$onAction(({
  name, // action 的名字
  store, // store 实例
  args, // 调用这个 action 的参数
  after, // 在这个 action 执行完毕之后，执行这个函数
  onError, // 在这个 action 抛出异常的时候，执行这个函数
}) => {
  history.push(JSON.stringify(store.$state))
})

const restore = () => {
  if(history.length === 0)message.info('之前没有操作哦')
  else items.$state = JSON.parse(history.pop())
}
</script>


<style>
.inputBox {
  @apply border px-2 my-2 py-1 border-gray-300 rounded-md outline-none
}
</style>
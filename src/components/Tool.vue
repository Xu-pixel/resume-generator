<template>
      <NTooltip trigger="hover" class="print:hidden">
        <template #trigger>
          <Icon @click="$emit('callback')" :icon="icon" class="w-6 h-6 cursor-pointer text-slate-400 outline-none"></Icon>
        </template>
        <slot></slot>
      </NTooltip>
</template>


<script setup>
import {NTooltip} from 'naive-ui'
import {Icon} from '@iconify/vue'
defineProps({
    icon:String
})
</script>
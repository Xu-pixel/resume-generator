<template>
    <div>

        <div class="border-b text-lg mt-3  pb-1 mb-2" :style="{borderBottomColor:itemsStore.color}">
            {{ title }}
        </div>
        <div>
            <slot></slot>
        </div>
    </div>

</template>


<script setup>
import { useItemsStore } from '../stores/ItemsStore.js';


const itemsStore = useItemsStore()
defineProps({
    title: String
})
</script>
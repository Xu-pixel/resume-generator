<template>
    <div class=" border w-2 h-2 rounded-full place-self-center" :style="{borderColor:itemsStore.color}">
    </div>
</template>


<script setup>
import { useItemsStore } from "../stores/ItemsStore";

const itemsStore = useItemsStore()

</script>
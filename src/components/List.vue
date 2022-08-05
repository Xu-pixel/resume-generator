<template>
    <div class="flex gap-4 text-sm items-center">
        <Round />
        <div class="font-bold">
            <slot /> :
        </div>
        <div>
            {{text}}
        </div>
    </div>
</template>


<script setup>
import Round from './Round.vue'
defineProps({
    text:String
})
</script>
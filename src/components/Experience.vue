<template>
    <div class="flex items-center w-full" v-if="isComplete">
        <div class="w-2 h-2 mr-3 bg-green-700 rounded-full"></div>
        <div class="w-full">
            <Between>
                <a class=" font-bold text-green-700" :href="link">
                    {{ name }}
                </a>
                <div>
                    {{ location }}
                </div>
            </Between>
            <Between class=" italic text-sm">
                <div>
                    {{ intro }}
                </div>
                <div>
                    {{ period }}
                </div>
            </Between>
        </div>
    </div>
    <div class="flex" v-for="detail in details">
        <div class="w-5 h-7" v-if="isComplete"></div>
        <List  :text="detail.text">{{ detail.bold }}</List>
    </div>
</template>


<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import Between from '../layouts/Between.vue';
import List from './List.vue'

const props = defineProps({
    name: String,
    intro: String,
    location: String,
    period: String,
    link: String,
    details: Array,
    hasDetail:Boolean
})

const isComplete = computed(() => props.name.length || props.intro.length || props.location.length || props.period.length)


</script>
<template>
    <div>

        <div class="border-b text-lg mt-3 border-green-700 pb-1 mb-2">
            {{ title }}
        </div>
        <div>
            <slot></slot>
        </div>
    </div>

</template>


<script setup>
defineProps({
    title: String
})
</script>
<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

const { elementX, elementY, elementWidth, elementHeight } =
  useMouseInElement(el)
const x = () => {
  if (elementX.value <= 0) return 0
  if (elementX.value >= elementWidth.value) return elementWidth.value
  return elementX.value
}

const y = () => {
  if (elementY.value <= 0) return 0
  if (elementY.value >= elementHeight.value) return elementHeight.value
  return elementY.value
}
</script>

<template>
  <div ref="el" class="relative">
    <div
      class="absolute -z-10 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200 blur-[75px] md:block dark:bg-sky-900 dark:opacity-30"
      :style="{
        // filter: 'blur(100px)',
        top: `${y()}px`,
        left: `${x()}px`,
      }"
    />
    <slot />
  </div>
</template>

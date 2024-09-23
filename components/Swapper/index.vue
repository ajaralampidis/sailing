<script setup lang="ts">
import { AccordionContent, AccordionItem, AccordionRoot } from 'radix-vue'
import useFormState, { swapPurchase, validateForm } from './formState'

// const view = ref('main')
const formState = useFormState()
const { state } = useOnboard()

const swap = () => {
  swapPurchase(formState)
}

const submit = () => {
  // console.log('formState', formState.value)
  validateForm(formState, state.get())
}

watch(
  () => ({ ...formState.value }),
  (newState, oldState) => {
    if (!formState.value.errors) {
      return
    }

    if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
      validateForm(formState, state.get())
    }
  },
)
</script>

<template>
  <MouseLight class="mx-2 w-full min-w-[300px] max-w-[550px]">
    <form
      class="relative rounded-sm border border-zinc-300 bg-white p-4 shadow-2xl transition-all md:p-6 dark:border-zinc-700 dark:bg-zinc-900"
      @submit.prevent="submit"
    >
      <h2 class="mb-4 text-xl font-bold">Swap</h2>

      <SwapperInput name="sellInputValue" />

      <div class="my-4 flex w-full items-center justify-center text-center">
        <hr class="w-full" />
        <button
          type="button"
          class="inline size-12 flex-shrink-0 rounded-full border border-zinc-200 text-lg font-semibold"
          @click="swap"
        >
          <IconSwapVert class="mx-auto" />
        </button>
        <hr class="w-full" />
      </div>

      <SwapperInput name="buyInputValue" />
      <hr class="my-6" />
      <SwapperAddress />
      <hr class="my-6" />
      <SwapperDetails />
      <hr class="my-6" />
      <p
        v-if="formState.errors?.global?._errors"
        class="mb-6 w-full text-center text-sm text-red-700"
      >
        {{ formState.errors?.global?._errors[0] }}
      </p>
      <button
        type="submit"
        class="glow w-full rounded-md bg-sky-600 py-4 text-2xl font-bold text-white transition-all hover:brightness-110"
      >
        Swap
      </button>
      <AccordionRoot
        v-model="formState.activeView"
        type="single"
        default-value="main"
      >
        <AccordionItem value="main">
          <AccordionContent></AccordionContent>
        </AccordionItem>

        <AccordionItem type="single" value="sell">
          <AccordionContent
            class="AccordionContent absolute inset-0 z-10 w-full border border-zinc-300 bg-white shadow-sm"
          >
            <SwapperAssetModal name="sell" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem type="single" value="buy">
          <AccordionContent
            class="AccordionContent absolute inset-0 z-10 w-full border border-zinc-300 bg-white shadow-sm"
          >
            <SwapperAssetModal name="buy" />
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </form>
  </MouseLight>
</template>

<style scoped>
.AccordionContent {
  overflow: hidden;
}
.AccordionContent[data-state='open'] {
  animation: slideDown 400ms ease-in-out;
}
.AccordionContent[data-state='closed'] {
  animation: slideUp 400ms ease-in-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>

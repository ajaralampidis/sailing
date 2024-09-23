<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from 'radix-vue'
import useFormState, { swapRate } from './formState'

const open = ref(false)

const formState = useFormState()

const buyRate = computed(() => {
  const rate = swapRate(formState)
  if (rate <= 0.001) {
    return '< 0.001'
  }

  if (rate >= 1000) {
    return '> 9999'
  }

  return '≃ ' + rate.toLocaleString()
})
</script>
<template>
  <CollapsibleRoot v-model:open="open">
    <CollapsibleTrigger
      class="w-full rounded-md border border-zinc-200 p-1 text-left text-sm font-medium text-zinc-600"
    >
      <div class="flex w-full justify-between">
        <div class="relative w-fit text-wrap">
          <span class="text-nowrap">
            <IconCurrencyChange
              class="mr-2 inline size-5 fill-zinc-500 align-text-bottom"
            />
            <b>1</b> {{ formState.sellToken.symbol.toUpperCase() }}
            <b>{{ buyRate }}</b>
            {{ formState.buyToken.symbol.toUpperCase() }}
          </span>
          <wbr />
          <span class="ml-2 text-nowrap">
            <IconGas class="inline size-5 fill-zinc-500 align-text-bottom" />
            Fee: $0.03
          </span>
          <div
            class="absolute bottom-0 left-0 right-0 top-0 z-10 flex bg-white font-bold transition-all"
            :class="{ 'opacity-0': !open }"
          >
            <span class="self-center"> Fee Details: </span>
          </div>
        </div>

        <IconChevronDown
          class="size-5 self-center transition-all duration-200"
          :class="{ 'rotate-180': open }"
        />
      </div>
      <CollapsibleContent>
        <hr class="my-2" />
        <ul class="space-y-1 [&>*]:flex [&>*]:w-full [&>*]:justify-between">
          <li>
            <span>Change Rate:</span>
            <span>
              <b>1</b> {{ formState.sellToken.symbol.toUpperCase() }}
              <b>{{ buyRate }}</b>
              {{ formState.buyToken.symbol.toUpperCase() }}
            </span>
          </li>
          <li><span>Total Fee:</span> <b class="ml-1"> 0 ETH</b></li>
          <li><span>Platform Fee:</span><b class="ml-1"> 0 ETH</b></li>
          <li>
            <span>Destination Network Fee:</span><b class="ml-1"> 0 ETH</b>
          </li>
          <li><span>Time:</span><b class="ml-1"> ∼1min 45s</b></li>
        </ul>
      </CollapsibleContent>
    </CollapsibleTrigger>
  </CollapsibleRoot>
</template>

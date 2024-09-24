<script setup lang="ts">
import useFormState, { setBuyAmount, setSellAmount } from './formState'
import { onKeyStroke } from '@vueuse/core'

const formState = useFormState()

const { name } = defineProps<{
  name: 'buyInputValue' | 'sellInputValue'
}>()

const viewName = computed(() => {
  if (name === 'buyInputValue') {
    return 'buy'
  }
  if (name === 'sellInputValue') {
    return 'sell'
  }

  return 'main'
})

const tokenKey = computed(() => {
  if (name === 'buyInputValue') {
    return 'buyToken'
  }
  if (name === 'sellInputValue') {
    return 'sellToken'
  }
  throw new Error('Invalid name')
})

const chainKey = computed(() => {
  if (name === 'buyInputValue') {
    return 'buyChain'
  }
  if (name === 'sellInputValue') {
    return 'sellChain'
  }
  throw new Error('Invalid name')
})

const tokenTiker = computed(() => {
  return formState.value[tokenKey.value]?.symbol.toUpperCase() || ''
})

const valInUSD = computed(() => {
  if (formState.value[tokenKey.value] == null) return 0
  if (formState.value[name] == null) return 0

  const val =
    formState.value[tokenKey.value]!.current_price * formState.value[name]

  return val
})

const { state } = useOnboard()

const balance = ref('N/A')

const { unsubscribe } = state.select().subscribe((s) => {
  if (s.wallets.length === 0) {
    balance.value = 'N/A'
    return
  }

  if (!tokenTiker.value) {
    balance.value = 'N/A'
    return
  }

  s.wallets.forEach((w) =>
    w.accounts.forEach((a) => {
      if (a.balance?.[tokenTiker.value]) {
        balance.value = a.balance[tokenTiker.value]
        return
      }
    }),
  )
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement

  // console.log(event)

  if (name === 'buyInputValue') {
    formState.value.buyInputValue = Number(target.value)
    setSellAmount(formState)
    return
  }

  if (name === 'sellInputValue') {
    formState.value.sellInputValue = Number(target.value)
    setBuyAmount(formState)
    return
  }
}

onKeyStroke('ArrowDown', (e) => {
  e.preventDefault()
})
onKeyStroke('ArrowUp', (e) => {
  e.preventDefault()
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <label
    class="mb-2 flex items-center gap-1 font-semibold capitalize text-zinc-500"
    for="sell"
  >
    {{ viewName }}
    <span
      class="line-clamp-1 block w-full text-ellipsis text-nowrap break-all text-sm font-normal normal-case sm:hidden"
    >
      — {{ formState[tokenKey].symbol.toUpperCase() }} on
      {{ formState[chainKey].name }} network
    </span>
  </label>
  <div
    class="flex items-center gap-2 rounded-md bg-zinc-100 p-2 transition-all hover:bg-zinc-200/70"
  >
    <!-- v-model="formState[name]" -->
    <input
      :id="name"
      class="h-full w-full bg-transparent text-4xl font-bold outline-offset-4"
      type="number"
      step="any"
      min="0"
      :name="name"
      :value="formState[name]"
      autocomplete="false"
      placeholder="0"
      @input="handleInput"
    />

    <button
      type="button"
      class="flex h-fit w-fit cursor-pointer rounded-full border border-zinc-300 bg-zinc-50 p-1 transition-all hover:border-zinc-400 hover:bg-white hover:shadow-md"
      @click="formState.activeView = viewName"
    >
      <div class="relative mr-3 size-11 flex-shrink-0 align-bottom">
        <!-- src="https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385" -->
        <img
          v-if="formState[chainKey]"
          :src="formState[chainKey]?.image"
          class="absolute -right-2 bottom-0 size-6 rounded-full border border-white bg-white align-bottom shadow-sm"
        />
        <div
          v-else
          class="absolute -right-2 bottom-0 size-6 rounded-full border border-white bg-zinc-300 align-bottom"
        />

        <img
          v-if="formState[tokenKey]"
          :src="formState[tokenKey]?.image"
          class="size-11 rounded-full border"
        />
        <div v-else class="size-11 rounded-full bg-zinc-300" />
      </div>
      <div
        class="hidden flex-shrink overflow-hidden text-left align-middle sm:block"
      >
        <p class="line-clamp-1 w-[130px] break-all text-lg font-medium">
          {{ formState[tokenKey] ? formState[tokenKey]?.name : 'Select Token' }}
        </p>
        <p
          class="line-clamp-1 w-[130px] break-all text-xs/normal font-medium text-zinc-500"
        >
          {{
            formState[chainKey]
              ? formState[chainKey]?.name + ' network'
              : 'Select network'
          }}
        </p>
      </div>
      <IconChevronDown class="mr-1 size-7 self-center" />
    </button>
  </div>
  <div class="flex items-center justify-between">
    <p
      class="mt-2 line-clamp-1 w-[14ch] overflow-ellipsis break-all font-semibold text-zinc-500"
    >
      $ {{ valInUSD.toLocaleString() }}
    </p>
    <p
      class="mt-2 line-clamp-1 w-[16ch] overflow-ellipsis break-all text-right font-semibold text-zinc-500"
      :class="[
        { hidden: name === 'buyInputValue' },
        { hidden: balance === 'N/A' },
      ]"
    >
      Balance: {{ tokenTiker }} <ClientOnly> {{ balance }} </ClientOnly>
    </p>
  </div>
  <p v-if="formState.errors?.[name]?._errors" class="text-sm text-red-700">
    {{ formState.errors?.[name]._errors[0] }}
  </p>
</template>

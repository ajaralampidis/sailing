<script setup lang="ts">
import { matchSorter } from 'match-sorter'
import { onClickOutside } from '@vueuse/core'
import { onKeyStroke } from '@vueuse/core'
import useFormState, {
  FAKECHAINS,
  setBuyAmount,
  type Chain,
  type Token,
} from './formState'

const formState = useFormState()

const container = ref(null)
onClickOutside(container, () => {
  formState.value.activeView = 'main'
})

onKeyStroke('Escape', () => {
  formState.value.activeView = 'main'
})

const { name } = defineProps<{
  name: 'buy' | 'sell'
}>()

const chainKey = computed<'buyChain' | 'sellChain'>(() => {
  if (name === 'buy') {
    return 'buyChain'
  }
  if (name === 'sell') {
    return 'sellChain'
  }

  throw new Error('Invalid name')
})

const tokenKey = computed<'buyToken' | 'sellToken'>(() => {
  if (name === 'buy') {
    return 'buyToken'
  }
  if (name === 'sell') {
    return 'sellToken'
  }

  throw new Error('Invalid name')
})

const setChain = (value: Chain) => {
  formState.value[chainKey.value] = value
  setBuyAmount(formState)
}

const { data: tokens, status } = await useFetch<Token[]>(
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250',
  {
    lazy: true,
  },
)

const tokenSearch = ref('')
const tokenList = computed(() => {
  if (!tokenSearch.value || !tokens.value) {
    return tokens.value
  } else {
    return matchSorter(tokens.value, tokenSearch.value, {
      keys: ['name', 'symbol'],
    })
  }
})

const setToken = (value: Token) => {
  formState.value[tokenKey.value] = value
  setBuyAmount(formState)
}

const focusGrid = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (focusGrid.value && focusGrid.value.firstElementChild) {
    ;(focusGrid.value.firstElementChild as HTMLButtonElement).focus({
      preventScroll: true,
    })
  }
})
</script>

<template>
  <div
    ref="container"
    class="h-full w-full overflow-y-scroll bg-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 md:p-6 dark:border-zinc-700 dark:bg-zinc-900"
  >
    <div class="sticky top-0 h-0 w-full text-right">
      <button
        aria-label="Confirm Selection"
        class="-translate-y-2 rounded-md border bg-zinc-100 px-4 py-2 text-center font-medium text-zinc-900 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-300 hover:shadow-md"
        type="button"
        @click="formState.activeView = 'main'"
      >
        Confirm
        <IconCheck class="inline size-5 fill-zinc-900 align-text-bottom" />
      </button>
    </div>

    <h3 class="mb-4 mt-2 w-full text-xl font-bold">Select a Network</h3>

    <div ref="focusGrid" class="grid grid-cols-2 gap-2">
      <button
        v-for="chain in FAKECHAINS"
        :key="chain.name"
        type="button"
        class="duration-400 rounded-md border p-1 text-left outline-1 transition-all hover:bg-zinc-100 focus:outline dark:bg-zinc-700"
        :class="{
          'border-sky-400': formState[chainKey]?.name === chain.name,
          'bg-sky-100': formState[chainKey]?.name === chain.name,
        }"
        @click="() => setChain(chain)"
      >
        <img
          class="inline size-7 rounded-full align-bottom"
          :src="chain.image"
          :alt="chain.name"
          :title="chain.name"
        />
        <span class="ml-2 line-clamp-1 inline text-ellipsis font-medium">
          {{ chain.name }}
        </span>
      </button>
    </div>
    <hr class="my-6" />
    <h2 class="mb-4 text-xl font-bold">Select a Token</h2>

    <input
      v-model="tokenSearch"
      type="text"
      placeholder="Search Tokens"
      class="mb-4 w-full rounded-sm border border-zinc-300 bg-zinc-100 p-1"
    />

    <div class="space-y-2">
      <div v-if="status === 'pending'">Loading ...</div>
      <div v-else-if="status === 'error'">
        Error Loading Tokens. Please try reloading the page.
      </div>
      <div v-else>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="token in tokenList"
            :key="token.id"
            type="button"
            class="duration-400 flex items-center rounded-md border p-1 text-left transition-all hover:bg-zinc-100 dark:bg-zinc-700"
            :class="{
              'border-sky-400': formState[tokenKey]?.name === token.name,
              'bg-sky-100': formState[tokenKey]?.name === token.name,
            }"
            :title="token.name"
            @click="() => setToken(token)"
          >
            <img
              class="inline size-7 rounded-full align-bottom"
              :src="token.image"
              :alt="token.name"
              :title="token.name"
            />

            <p
              class="ml-2 line-clamp-1 inline-block text-ellipsis text-nowrap break-all font-medium"
            >
              {{ token.name }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadowTop {
  box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.25);
}
</style>

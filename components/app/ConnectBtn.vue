<script setup lang="ts">
const { connectWallet, state } = useOnboard()

const connect = async () => {
  console.log('CONNECT')
  await connectWallet()
}

const address = ref('')

const { unsubscribe } = state.select().subscribe((s) => {
  const addr = s.wallets[0]?.accounts[0].address
  if (addr) {
    address.value = addr.slice(0, 3) + '...' + addr.slice(-5)
    return
  }
  return ''
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <ClientOnly>
    <button
      class="group m-auto flex w-[132px] cursor-pointer rounded-md bg-sky-600 py-[0.4rem] transition-colors duration-500 hover:bg-sky-700 sm:w-[165px] md:py-[0.5rem] md:[filter:_drop-shadow(0_1px_4px_rgb(0_176_230_/_0.5))_drop-shadow(0_1px_2px_rgb(0_176_230_/_0.3))]"
      :class="!!address && 'pointer-events-none'"
      @click="connect"
    >
      <p class="m-auto text-base font-medium text-white">
        {{ address ? address : 'Connect App' }}
      </p>
    </button>
    <template #placeholder>
      <!-- this will be rendered on server side -->
      <button
        disabled
        class="group m-auto flex w-[132px] rounded-md bg-sky-600 py-[0.4rem] opacity-75 transition-colors duration-500 hover:bg-sky-700 sm:w-[165px] md:py-[0.5rem]"
      >
        <p class="m-auto text-base font-medium text-white">Connect App</p>
      </button>
    </template>
  </ClientOnly>
</template>

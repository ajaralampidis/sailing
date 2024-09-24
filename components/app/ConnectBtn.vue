<script setup lang="ts">
const { connectWallet } = useOnboard()

const connect = async () => {
  await connectWallet()
}
const wallets = useWalletSubscription()
const address = computed(() => {
  const adr = wallets.value[0]?.accounts[0]?.address

  return adr ? adr.slice(0, 3) + '...' + adr.slice(-5) : adr
})
</script>

<template>
  <ClientOnly>
    <button
      class="group m-auto flex w-[132px] cursor-pointer rounded-md bg-sky-600 py-[0.4rem] transition-colors duration-500 hover:bg-sky-700 sm:w-[165px] md:py-[0.5rem] md:[filter:_drop-shadow(0_1px_4px_rgb(0_176_230_/_0.5))_drop-shadow(0_1px_2px_rgb(0_176_230_/_0.3))]"
      :disabled="!!address"
      @click="connect"
    >
      <p class="m-auto text-base font-medium text-white">
        {{ address ? address : 'Connect Wallet' }}
      </p>
    </button>
    <template #placeholder>
      <!-- this will be rendered on server side -->
      <button
        disabled
        class="group m-auto flex w-[132px] rounded-md bg-sky-600 py-[0.4rem] opacity-75 transition-colors duration-500 hover:bg-sky-700 sm:w-[165px] md:py-[0.5rem]"
      >
        <p class="m-auto text-base font-medium text-white">Connect Wallet</p>
      </button>
    </template>
  </ClientOnly>
</template>

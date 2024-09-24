<script setup lang="ts">
const { connectWallet } = useOnboard()
const wallets = useWalletSubscription()
const address = computed(() => wallets.value[0]?.accounts[0]?.address)

const connect = async () => {
  await connectWallet()
}
</script>

<template>
  <button
    type="button"
    :disabled="!!address"
    class="glow w-full rounded-md bg-sky-600 py-4 text-2xl font-bold text-white transition-all hover:brightness-110"
    @click="connect"
  >
    Connect wallet
  </button>
</template>

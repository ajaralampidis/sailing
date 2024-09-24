import type { WalletState } from '@web3-onboard/core'
import { useSubscription } from '@vueuse/rxjs'

export default function useWalletSubscription() {
  const { state } = useOnboard()

  const address = ref<WalletState[]>([])

  useSubscription(
    state.select('wallets').subscribe((update) => {
      address.value = update
    }),
  )

  return computed(() => address.value)
}

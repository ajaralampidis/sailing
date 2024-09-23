import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'

const INFURA_ID = '27e01091c7cc404db7a580f6ac66dd99'

const chains = [
  {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  },
  {
    id: 42161,
    token: 'ARB-ETH',
    label: 'Arbitrum One',
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
  },
  {
    id: '0xa4ba',
    token: 'ARB',
    label: 'Arbitrum Nova',
    rpcUrl: 'https://nova.arbitrum.io/rpc',
  },
  {
    id: 137,
    token: 'MATIC',
    label: 'Matic Mainnet',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
  },
  {
    id: '0x2105',
    token: 'ETH',
    label: 'Base',
    rpcUrl: 'https://mainnet.base.org',
  },
]

const appMetadata = {
  name: 'Sailing Protocol Test',
  description: 'Sailing Protocol Test',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
  ],
}

const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: '10250d317691d6456c8535a268668af2',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  optionalChains: [42161, 8453, 10, 137, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://localhost:3000/',
}

// initialize the module with options
const walletConnect = walletConnectModule(wcInitOptions)

// can also initialize with no options...
const injected = injectedModule()

const wallets = [injected, walletConnect]

const onboard = Onboard({
  // ... other Onboard options
  wallets,
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
  },
})

export default function useOnboard() {
  return reactive(onboard)
}

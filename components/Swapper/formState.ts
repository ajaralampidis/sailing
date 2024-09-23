import type { AppState } from '@web3-onboard/core'
import { z } from 'zod'

export interface Chain {
  name: string
  symbol: string
  image: string
}

export interface Token {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

const chainSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  image: z.string(),
})

const tokenSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
})

// Define the main schema using the reusable schemas
export const swapperStateSchema = z
  .object({
    activeView: z.enum(['main', 'sell', 'buy']),
    sellInputValue: z.number().positive(),
    buyInputValue: z.number().positive(),
    sellChain: chainSchema,
    buyChain: chainSchema,
    sellToken: tokenSchema,
    buyToken: tokenSchema,
    address: z.string().optional(),
    externalAddress: z.boolean(),
  })
  .refine(
    (state) => {
      console.log('refining')
      if (state.externalAddress && !state.address) return false
      return true
    },
    {
      message: 'You must provide an address when using an external address',
      path: ['address'],
    },
  )

interface SwapperState {
  activeView: 'main' | 'sell' | 'buy'
  sellInputValue: number | null
  buyInputValue: number | null
  sellChain: Chain
  buyChain: Chain
  sellToken: Token
  buyToken: Token
  address?: string
  externalAddress: boolean
  errors: { [key: string]: z.ZodFormattedError<unknown> } | null
}

export default function useFormState() {
  // Use a reactive object
  const formState = useState<SwapperState>('swapperState', () => ({
    activeView: 'main',
    sellInputValue: null,
    buyInputValue: null,
    buyChain: FAKECHAINS[1],
    sellChain: FAKECHAINS[0],
    buyToken: eth,
    sellToken: eth,
    address: '',
    externalAddress: false,
    errors: null,
  }))

  return formState
}

export function swapPurchase(formState: ReturnType<typeof useFormState>) {
  const buyChain = formState.value.buyChain
  const buyInputValue = formState.value.buyInputValue
  const buyToken = formState.value.buyToken

  formState.value.buyChain = formState.value.sellChain
  formState.value.buyInputValue = formState.value.sellInputValue
  formState.value.buyToken = formState.value.sellToken

  formState.value.sellChain = buyChain
  formState.value.sellInputValue = buyInputValue
  formState.value.sellToken = buyToken
}

export function setBuyAmount(formState: ReturnType<typeof useFormState>) {
  const sellTotalInUsd =
    formState.value.sellToken.current_price *
    (formState.value.sellInputValue || 0)

  formState.value.buyInputValue =
    sellTotalInUsd / formState.value.buyToken.current_price
}

export function setSellAmount(formState: ReturnType<typeof useFormState>) {
  const buyTotalInUsd =
    formState.value.buyToken.current_price *
    (formState.value.buyInputValue || 0)

  formState.value.sellInputValue =
    buyTotalInUsd / formState.value.sellToken.current_price
}

export function swapRate(formState: ReturnType<typeof useFormState>) {
  const sell = formState.value.sellToken.current_price
  const buy = formState.value.buyToken.current_price

  return buy <= sell ? buy / sell : sell / buy
}

export function hasEnoughBalance(
  formState: ReturnType<typeof useFormState>,
  state: AppState,
) {
  const sellToken = formState.value.sellToken.symbol.toUpperCase()
  const amount = formState.value.sellInputValue || 0

  if (state.wallets.length === 0) {
    return false
  }

  return state.wallets.some((w) =>
    w.accounts.some((a) => {
      if (a.balance?.[sellToken]) {
        return Number(a.balance[sellToken]) >= amount
      }
    }),
  )
}

export function validateForm(
  formState: ReturnType<typeof useFormState>,
  state: AppState,
) {
  const errors: { [key: string]: z.ZodFormattedError<unknown> } = {}

  const result = swapperStateSchema.safeParse(formState.value)
  if (!result.success) {
    const formated = result.error.format()
    console.log('errors', formated)
    Object.assign(errors, formated)
  }

  if (!hasEnoughBalance(formState, state)) {
    errors.global = { _errors: ['Not enough balance'] }
  }

  if (Object.keys(errors).length <= 0) {
    console.log('no error')
    return
  } else {
    formState.value.errors = errors
  }
}

const eth: Token = {
  id: 'ethereum',
  symbol: 'eth',
  name: 'Ethereum',
  image:
    'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
  current_price: 2552.52,
}

export const FAKECHAINS: Chain[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://sailingprotocol.org/dist/ethereum.png',
  },
  {
    name: 'Optimism',
    symbol: 'OP',
    image: 'https://sailingprotocol.org/dist/optimism.png',
  },
  {
    name: 'Celo',
    symbol: 'CGLD',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png',
  },
  {
    name: 'Base',
    symbol: 'BASE',
    image: 'https://sailingprotocol.org/dist/base.png',
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    image: 'https://sailingprotocol.org/dist/polygon.png',
  },
  {
    name: 'Rootstock',
    symbol: 'RBTC',
    image: 'https://sailingprotocol.org/dist/bitcoin.png',
  },
  {
    name: 'Kava',
    symbol: 'KAVA',
    image: 'https://sailingprotocol.org/dist/kava.png',
  },
  {
    name: 'Arbitrum',
    symbol: 'ARB',
    image: 'https://sailingprotocol.org/dist/arbitrum.png',
  },
]

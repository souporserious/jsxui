import * as React from 'react'

import { useVariantProps } from './Variants'

const TokensContext = React.createContext({})

export type TokenProps = {
  value?: any
  variants?: object
  children?: React.ReactNode
}

export function useTokens(): { [key in any]: any } {
  return React.useContext(TokensContext)
}

export function Tokens({ children, value, variants }) {
  const tokens = React.useContext(TokensContext)
  const variantProps = useVariantProps({ variants, ...value })
  return (
    <TokensContext.Provider value={{ ...tokens, ...variantProps }}>
      {children}
    </TokensContext.Provider>
  )
}

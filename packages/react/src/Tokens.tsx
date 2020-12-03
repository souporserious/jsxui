import * as React from 'react'

const TokensContext = React.createContext({})

export type TokenProps = {
  value?: any
  variants?: object
  children?: React.ReactNode
}

export function useTokens(): { [key in any]: any } {
  return React.useContext(TokensContext)
}

export function Tokens({ children, value }) {
  const tokens = React.useContext(TokensContext)
  return (
    <TokensContext.Provider value={{ ...tokens, ...value }}>
      {children}
    </TokensContext.Provider>
  )
}

import * as React from 'react'
import delve from 'dlv'

const TokensContext = React.createContext({})

export function useTokens(key?) {
  const tokens = React.useContext(TokensContext)
  return key ? delve(tokens, key) : tokens
}

export function Tokens({ value, children }) {
  return (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  )
}

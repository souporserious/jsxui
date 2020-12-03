import * as React from 'react'

const TokensContext = React.createContext({})

export function useTokens(): { [key in any]: any } {
  return React.useContext(TokensContext)
}

export function Tokens({ children, ...props }) {
  const tokens = React.useContext(TokensContext)
  return (
    <TokensContext.Provider value={{ ...tokens, ...props }}>
      {children}
    </TokensContext.Provider>
  )
}

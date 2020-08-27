import * as React from 'react'

import { getInstance } from './utils'

const OverridesContext = React.createContext([])

export function useOverrideProps<Props>(instance, props) {
  const OverridesStack = React.useContext(OverridesContext)
  let modifiedProps = {} as Props
  OverridesStack.forEach(Overrides => {
    Overrides.forEach(override => {
      const components = override.slice(0, -1).map(getInstance)
      const overrideProps = override.slice(-1)[0]
      if (components.includes(getInstance(instance))) {
        modifiedProps = {
          ...modifiedProps,
          ...overrideProps,
        }
      }
    })
  })
  return {
    ...modifiedProps,
    ...props,
  }
}

export function Overrides({ value, children }) {
  const parentOverrides = React.useContext(OverridesContext)
  return (
    <OverridesContext.Provider value={[...parentOverrides, value]}>
      {children}
    </OverridesContext.Provider>
  )
}

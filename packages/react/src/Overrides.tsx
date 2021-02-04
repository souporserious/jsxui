import * as React from 'react'

import { isSameInstance } from './utils'

export const OverridesContext = React.createContext([])

export function getOverrideProps(overridesContext, component, props) {
  let mergedProps = {
    ...props,
  } as React.ComponentProps<typeof component>
  overridesContext.forEach((overrides) => {
    overrides.forEach(([instance, overrideProps]) => {
      if (isSameInstance(instance, component)) {
        mergedProps = {
          ...(typeof overrideProps === 'function'
            ? overrideProps(mergedProps)
            : overrideProps),
          ...mergedProps,
          variants: {
            ...overrideProps.variants,
            ...mergedProps.variants,
          },
        }
      }
    })
  })
  return mergedProps
}

export function useOverrideProps<C extends React.ElementType>(
  component: C,
  props: React.ComponentProps<C>
): React.ComponentProps<C> {
  const overridesContext = React.useContext(OverridesContext)
  return getOverrideProps(overridesContext, component, props)
}

export type OverridesProps = {
  value: React.ReactNode[] | [React.ElementType, object][]
  children: React.ReactNode
}

export function Overrides({ value, children }: OverridesProps) {
  const parentOverrides = React.useContext(OverridesContext)
  return (
    <OverridesContext.Provider value={[...parentOverrides, value]}>
      {children}
    </OverridesContext.Provider>
  )
}

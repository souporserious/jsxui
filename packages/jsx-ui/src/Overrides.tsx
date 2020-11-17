import * as React from 'react'

import { isSameInstance } from './utils'

export const OverridesContext = React.createContext([])

export function useOverrideProps<C extends React.ElementType>(
  component: C,
  props: React.ComponentProps<C>
): React.ComponentProps<C> {
  const overridesStack = React.useContext(OverridesContext)
  let modifiedProps = {} as React.ComponentProps<typeof component>
  overridesStack.forEach(overrides => {
    overrides.forEach(([instance, props]) => {
      if (isSameInstance(instance, component)) {
        modifiedProps = {
          ...modifiedProps,
          ...(typeof props === 'function' ? props(modifiedProps) : props),
        }
      }
    })
  })
  return {
    ...modifiedProps,
    ...props,
  }
}

export type OverridesProps = {
  value: React.ReactNode[] | [React.ElementType, object][]
  children: React.ReactNode
}

export function Overrides({ value, children }: OverridesProps) {
  const parentOverrides = React.useContext(OverridesContext)
  const mergedOverrides = React.useMemo(() => [...parentOverrides, value], [])
  return (
    <OverridesContext.Provider value={mergedOverrides}>
      {children}
    </OverridesContext.Provider>
  )
}

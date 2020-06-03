import * as React from 'react'

const ModifiersContext = React.createContext(null)

export function useModifiers() {
  return React.useContext(ModifiersContext)
}

export function getInstance(instance) {
  return (
    instance.render ||
    (instance.type ? instance.type.render || instance.type : instance)
  )
}

export function useModifierProps<Props>(instance, props) {
  const modifiersStack = useModifiers()
  let modifiedProps = {} as Props
  modifiersStack.forEach(modifiers => {
    modifiers.forEach(modifier => {
      const components = modifier.slice(0, -1).map(getInstance)
      const modifierProps = modifier.slice(-1)[0]
      if (components.includes(getInstance(instance))) {
        modifiedProps = {
          ...modifiedProps,
          ...modifierProps,
        }
      }
    })
  })
  return { ...modifiedProps, ...props }
}

export function Modifiers({ value, children }) {
  const parentModifiers = useModifiers()
  const nextValue = Array.isArray(parentModifiers)
    ? [...parentModifiers, value]
    : [value]
  return (
    <ModifiersContext.Provider value={nextValue}>
      {children}
    </ModifiersContext.Provider>
  )
}

import * as React from 'react'

const VariantsContext = React.createContext([])

export function useVariantProps<Props>({
  variants,
  ...props
}: { variants?: object } & Props): Omit<Props, 'variants'> {
  const contextVariants = React.useContext(VariantsContext)
  let mergedProps = { ...props }
  if (variants) {
    const activeVariants = Object.entries(contextVariants)
      .filter(([, active]) => active)
      .map(([prop]) => prop)
    activeVariants.forEach((activeVariant) => {
      const variantProps = variants[activeVariant]
      mergedProps = {
        ...mergedProps,
        ...(typeof variantProps === 'function'
          ? variantProps(mergedProps)
          : variantProps),
      }
    })
  }
  // check and convert boolean props that have a variant value
  // <Text visible="checkout-success">Success!</Text>
  Object.entries(contextVariants).forEach(([variant, active]) => {
    Object.entries(props).forEach(([prop, value]) => {
      if (value === variant) {
        mergedProps[prop] = active
      }
    })
  })
  return mergedProps
}

export type VariantsProps = {
  value: object
  children: React.ReactNode
}

export function Variants({ value, children }: VariantsProps) {
  const parentVariants = React.useContext(VariantsContext)
  return (
    <VariantsContext.Provider
      value={{
        ...parentVariants,
        ...value,
      }}
    >
      {children}
    </VariantsContext.Provider>
  )
}

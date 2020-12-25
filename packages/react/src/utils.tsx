import * as React from 'react'

import { Spacer } from './Spacer'

/**
 * Utility type for getting props type of React component.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>

/**
 * Utility type for omitting a key from an object
 */
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

/**
 * Parses number values and adds pixel suffix.
 */
export function parseValue(value) {
  return typeof value === 'number' ? value + 'px' : value
}

/**
 * Returns the instance of a component. Takes pragma wrapped components into account.
 */
export function getInstance(instance) {
  const originalType = instance?.props?.__originalType
  if (originalType) {
    return getInstance(originalType)
  } else {
    return (
      instance.render ||
      (instance.type ? instance.type.render || instance.type : instance)
    )
  }
}

/**
 * Determines if two component instances are the same.
 */
export function isSameInstance(element1, element2) {
  return element1 && element2
    ? element2.constructor === Array
      ? element2.some(
          (element) =>
            getInstance(element1).toString() === getInstance(element).toString()
        )
      : getInstance(element1).toString() === getInstance(element2).toString()
    : false
}

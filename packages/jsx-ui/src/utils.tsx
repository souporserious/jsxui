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
 * Parses number values as Spacer
 */
export function parseSpaceValue(value) {
  return typeof value === 'string' || typeof value === 'number' ? (
    <Spacer size={value} />
  ) : (
    value
  )
}

/**
 * Parses minmax() string and returns a style object
 */
export function parseMinMax(value, mainAxis) {
  const style = {} as any
  const mainDimension = mainAxis === 'horizontal' ? 'Width' : 'Height'
  if (typeof value === 'string' && value.includes('minmax')) {
    const [min, max] = value
      .split('minmax(')[1]
      .split(')')[0]
      .split(',')
      .map(value => value.trim())
    if (max.includes('fr')) {
      const maxFloat = parseFloat(max)
      if (maxFloat < 0) {
        throw new Error(
          'Negative fractions cannot exist. Use a positive fraction.'
        )
      }
      style.flexGrow = maxFloat
    } else {
      style[`max${mainDimension}`] = max
    }
    if (min.includes('fr')) {
      throw new Error(
        'Fractional minimums cannot exist. Use a maximum fraction "minmax(16px, 1fr)".'
      )
    } else {
      style[`min${mainDimension}`] = min
    }
  } else if (typeof value === 'string' && value.includes('fr')) {
    style.flex = `${parseFloat(value)} 1 0`
  } else {
    style[`min${mainDimension}`] = value
  }
  return style
}

/**
 * Returns the instance of a component.
 */
export function getInstance(instance) {
  return (
    instance.render ||
    (instance.type ? instance.type.render || instance.type : instance)
  )
}

/**
 * Determines if two component instances are the same.
 */
export function isSameInstance(element1, element2) {
  return getInstance(element1).toString() === getInstance(element2).toString()
}

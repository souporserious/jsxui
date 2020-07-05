import * as React from 'react'

/**
 * Utility type for getting props type of React component.
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>

/**
 * Parses number values and adds pixel suffix.
 */
export function parseValue(value) {
  return typeof value === 'number' ? value + 'px' : value
}

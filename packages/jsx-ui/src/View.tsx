import * as React from 'react'

import { PropsOf } from './utils'

export interface ViewOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E
  children?: React.ReactNode
}

export type ViewProps<E extends React.ElementType> = ViewOwnProps<E> &
  Omit<PropsOf<E>, keyof ViewOwnProps>

const defaultElement = 'div'

export const View = React.forwardRef(
  ({ as, children, ...restProps }: ViewOwnProps, ref: React.Ref<Element>) => {
    const Element = as || defaultElement
    return (
      <Element ref={ref} {...restProps}>
        {children}
      </Element>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ViewProps<E>
) => JSX.Element

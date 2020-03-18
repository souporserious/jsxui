import * as React from 'react'

import { PropsOf } from './utils'

export interface TextOwnProps<E extends React.ElementType = React.ElementType> {
  // composition
  as?: E
  children?: React.ReactNode

  // style (tokens) <Theme Text={{ family: 'sans-serif' }}>
  family?: String
  size?: Number
  weight?: Number
}

export type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<PropsOf<E>, keyof TextOwnProps>

const defaultElement = 'span'

export const Text = React.forwardRef(
  ({ as, children, ...restProps }: TextOwnProps, ref: React.Ref<Element>) => {
    const Element = as || defaultElement
    return (
      <Element ref={ref} {...restProps}>
        {children}
      </Element>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: TextProps<E>
) => JSX.Element

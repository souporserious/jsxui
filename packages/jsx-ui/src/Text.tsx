import * as React from 'react'

import { useModifierProps } from './Modifiers'
import { useTokens } from './Tokens'
import { SharedProps } from './index'

export type TextProps = {
  as?: any
  family?: string
  size?: string
  weight?: string
  color?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & SharedProps

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (props, ref) => {
    const {
      as: Component = 'span',
      column,
      row,
      family,
      size,
      weight,
      color,
      style,
      children,
      ...restProps
    } = useModifierProps<TextProps>(Text, props)
    const { fontSizes, fontFamilies, fontWeights } = useTokens()
    return (
      <Component
        ref={ref}
        style={{
          gridColumn: column,
          gridRow: row,
          fontFamily: fontFamilies[family] || family,
          fontSize: fontSizes[size] || size,
          fontWeight: fontWeights[weight] || weight,
          color,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </Component>
    )
  }
)

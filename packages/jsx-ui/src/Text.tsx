import * as React from 'react'

import { useModifierProps } from './Modifiers'
import { useTokens } from './Tokens'
import { SharedProps } from './index'
import { parseValue } from './utils'

export type TextProps = {
  as?: any
  family?: string
  size?: string | number
  weight?: string | number
  color?: string
  x?: string | number
  y?: string | number
  width?: string | number
  height?: string | number
  visible?: boolean
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
      x = 0,
      y = 0,
      width,
      height,
      visible,
      style,
      children,
      ...restProps
    } = useModifierProps<TextProps>(Text, props)
    const { fontSizes, fontFamilies, fontWeights } = useTokens()

    if (visible === false) {
      return null
    }

    return (
      <Component
        ref={ref}
        style={{
          gridColumn: column,
          gridRow: row,
          fontFamily: fontFamilies[family] || family,
          fontSize: fontSizes[size] || size,
          fontWeight: fontWeights[weight] || weight,
          transform:
            x ?? y
              ? `translate(${parseValue(x)}, ${parseValue(y)})`
              : undefined,
          width,
          height,
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

Text.displayName = 'Text'

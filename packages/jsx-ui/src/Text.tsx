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
  offsetX?: string | number
  offsetY?: string | number
  translateX?: string | number
  translateY?: string | number
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
      offsetX,
      offsetY,
      translateX = 0,
      translateY = 0,
      width = 'max-content',
      height,
      visible,
      style = {},
      children,
      ...restProps
    } = useModifierProps<TextProps>(Text, props)
    const { fontSizes, fontFamilies, fontWeights } = useTokens()

    if (visible === false) {
      return null
    }

    if (offsetX !== undefined || offsetY !== undefined) {
      style.position = 'absolute'
      style.top = offsetX
      style.left = offsetY
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
            translateX ?? translateY
              ? `translate(${parseValue(translateX)}, ${parseValue(
                  translateY
                )})`
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

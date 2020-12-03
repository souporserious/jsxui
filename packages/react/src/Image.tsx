import * as React from 'react'

import { SharedProps } from './index'

export type ImageProps = {
  source?: any
  width?: number
  height?: number
  aspectRatio?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & SharedProps

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
    const {
      source,
      column,
      row,
      width,
      height,
      style,
      children,
      ...restProps
    } = props
    return (
      <img
        ref={ref}
        src={source}
        style={{
          gridColumn: column,
          gridRow: row,
          width,
          height,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </img>
    )
  }
)

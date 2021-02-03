import * as React from 'react'

import { StackContext } from './Contexts'
import { SharedProps } from './index'
import { useTokens } from './Tokens'

export type DividerProps = {
  color?: string
  size?: string
} & SharedProps

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ color = '#000', size = 1 }, ref) => {
    const isMainAxisHorizontal = React.useContext(StackContext)
    const tokens = useTokens()
    return (
      <div
        ref={ref}
        style={{
          width: isMainAxisHorizontal ? size : '100%',
          height: isMainAxisHorizontal ? '100%' : size,
          flexShrink: 0,
          backgroundColor: tokens.colors[color] || color,
        }}
      />
    )
  }
)

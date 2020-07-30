import * as React from 'react'

import { StackContext } from './Contexts'
import { useModifierProps } from './Modifiers'
import { SharedProps } from './index'

export type DividerProps = {
  color?: string
  size?: string
} & SharedProps

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (props, ref) => {
    const parentAxis = React.useContext(StackContext)
    const { color = '#000', column, row, size = 1 } = useModifierProps<
      DividerProps
    >(Divider, props)
    const isHorizontal = parentAxis === 'horizontal'
    return (
      <div
        ref={ref}
        style={{
          gridColumn: column,
          gridRow: row,
          width: isHorizontal ? size : '100%',
          height: isHorizontal ? '100%' : size,
          backgroundColor: color,
        }}
      />
    )
  }
)

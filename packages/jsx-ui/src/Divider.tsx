import * as React from 'react'

import { useModifierProps } from './Modifiers'
import { SharedProps } from './index'

export type DividerProps = {
  size?: string
} & SharedProps

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (props, ref) => {
    const { column, row, size } = useModifierProps<DividerProps>(Divider, props)
    return (
      <div
        ref={ref}
        style={{
          gridColumn: column,
          gridRow: row,
          width: size,
        }}
      />
    )
  }
)

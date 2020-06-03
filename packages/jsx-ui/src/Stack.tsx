import * as React from 'react'

import { getInstance, useModifierProps } from './Modifiers'
import { Spacer } from './Spacer'
import { SharedProps } from './index'

export type StackProps = {
  as?: any
  axis?: 'horizontal' | 'vertical'
  size?: Number | string
  alignment?: 'start' | 'center' | 'end'
  spaceStart?: Number | String
  spaceBetween?: Number | String
  spaceEnd?: Number | String
  background?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & SharedProps

export type Cell = {
  element?: any
  index?: number
  size: number
}

/** Use for vertical and horizontal layouts */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => {
    const {
      as: Component = 'div',
      column,
      row,
      axis,
      size,
      alignment,
      spaceStart,
      spaceBetween,
      spaceEnd,
      mainSize,
      crossSize,
      space,
      background,
      style,
      children,
      ...restProps
    } = useModifierProps<StackProps>(Stack, props)
    const isHorizontal = axis === 'horizontal'
    const mainSizeKey = isHorizontal ? 'width' : 'height'
    const crossSizeKey = isHorizontal ? 'height' : 'width'
    const trackCells = React.Children.toArray(children).reduce<Cell[]>(
      (cells, element, index) => {
        const cell = {
          element,
          size: React.isValidElement(element)
            ? (isHorizontal ? element.props.width : element.props.height) ||
              'auto'
            : null,
        }
        // TODO: fragile, look into better way to detect children
        if (getInstance(element).toString() === Spacer.toString()) {
          // @ts-ignore
          return [...cells, { size: element.props.size }]
        } else if (index === 0 || spaceBetween === undefined) {
          // @ts-ignore
          return cells.concat(cell)
        } else {
          return [...cells, { size: spaceBetween }, cell]
        }
      },
      []
    )
    if (spaceStart) {
      trackCells.unshift({ size: spaceStart })
    }
    if (spaceEnd) {
      trackCells.push({ size: spaceEnd })
    }
    return (
      <Component
        ref={ref}
        style={{
          display: 'grid',
          gridAutoFlow: axis === 'horizontal' ? 'column' : 'row',
          [`gridTemplate${
            isHorizontal ? 'Columns' : 'Rows'
          }`]: trackCells
            .map(cell =>
              typeof cell.size === 'number' ? `${cell.size}px` : cell.size
            )
            .join(' '),
          [`${isHorizontal ? 'align' : 'justify'}Items`]: alignment,
          gridColumn: column,
          gridRow: row,
          [mainSizeKey]: mainSize ?? size,
          [crossSizeKey]: crossSize ?? size,
          background,
          ...style,
        }}
        {...restProps}
      >
        {trackCells
          .map((cell, index) => ({ ...cell, index: index + 1 }))
          .filter(cell => Boolean(cell.element))
          .map(cell => {
            return trackCells.length > 1
              ? React.cloneElement(cell.element, {
                  [isHorizontal ? 'column' : 'row']: cell.index,
                })
              : cell.element
          })}
      </Component>
    )
  }
)

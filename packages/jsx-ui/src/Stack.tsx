import * as React from 'react'

import { isSameInstance, useModifierProps } from './Modifiers'
import { Spacer } from './Spacer'
import { Text } from './Text'
import { SharedProps } from './index'
import { parseValue } from './utils'

export type StackProps = {
  as?: any
  axis?: 'horizontal' | 'vertical'
  size?: number | string
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  spaceAround?: number | string
  spaceAfter?: number | string
  spaceBefore?: number | string
  spaceBetween?: number | string
  spaceCross?: number | string
  spaceCrossStart?: number | string
  spaceCrossEnd?: number | string
  spaceMain?: number | string
  spaceMainStart?: number | string
  spaceMainEnd?: number | string
  position?: string
  x?: string | number
  y?: string | number
  background?: string
  visible?: boolean
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
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      spaceAround,
      spaceMain,
      spaceMainStart,
      spaceMainEnd,
      spaceCross,
      spaceCrossStart,
      spaceCrossEnd,
      spaceBetween,
      spaceBefore,
      spaceAfter,
      background,
      position = 'relative',
      x = 0,
      y = 0,
      visible,
      style,
      children,
      ...restProps
    } = useModifierProps<StackProps>(Stack, props)

    if (visible === false) {
      return null
    }

    const isHorizontal = axis === 'horizontal'
    const childrenArray = React.Children.toArray(children)
    const trackCells = childrenArray.reduce<Cell[]>((cells, element, index) => {
      const previousElement = childrenArray[index - 1]
      const cell = {
        element,
        size: isSameInstance(element, Text)
          ? 'auto'
          : React.isValidElement(element)
          ? (isHorizontal ? element.props.width : element.props.height) ??
            element.props.size ??
            'auto'
          : null,
      }
      const spaceValue =
        (React.isValidElement(previousElement) &&
          previousElement?.props.spaceAfter) ??
        (React.isValidElement(element) && element.props.spaceBefore) ??
        spaceBetween
      if (isSameInstance(element, Spacer)) {
        // @ts-ignore
        return [...cells, { size: element.props.size }]
      } else if (index === 0 || spaceValue === undefined) {
        // @ts-ignore
        return cells.concat(cell)
      } else {
        return [...cells, { size: spaceValue }, cell]
      }
    }, [])
    const spaceMainStartValue = spaceMainStart ?? spaceMain ?? spaceAround
    const spaceMainEndValue = spaceMainEnd ?? spaceMain ?? spaceAround
    const spaceCrossStartValue = spaceCrossStart ?? spaceCross ?? spaceAround
    const spaceCrossEndValue = spaceCrossEnd ?? spaceCross ?? spaceAround
    if (spaceMainStartValue) {
      trackCells.unshift({ size: spaceMainStartValue })
    }
    if (spaceMainEndValue) {
      trackCells.push({ size: spaceMainEndValue })
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
          gridColumn: column,
          gridRow: row,
          width: width ?? size,
          height: height ?? size,
          transform:
            x ?? y
              ? `translate(${parseValue(x)}, ${parseValue(y)})`
              : undefined,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          background,
          position,
          ...style,
        }}
        {...restProps}
      >
        {trackCells
          .map((cell, index) => ({ ...cell, index: index + 1 }))
          .filter(cell => Boolean(cell.element))
          .map(cell => {
            const cellProps = { [isHorizontal ? 'column' : 'row']: cell.index }
            const childToRender =
              trackCells.length > 1
                ? React.cloneElement(cell.element, cellProps)
                : cell.element
            return spaceCrossStartValue ?? spaceCrossEndValue ? (
              <Stack
                key={cell.index}
                axis={isHorizontal ? 'vertical' : 'horizontal'}
                spaceMainStart={spaceCrossStartValue}
                spaceMainEnd={spaceCrossEndValue}
                {...cellProps}
              >
                {childToRender}
              </Stack>
            ) : (
              childToRender
            )
          })}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

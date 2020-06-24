import * as React from 'react'

import { isSameInstance, useModifierProps } from './Modifiers'
import { Spacer } from './Spacer'
import { Text } from './Text'
import { SharedProps } from './index'

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
  space?: number | string
  spaceMain?: number | string
  spaceMainStart?: number | string
  spaceMainEnd?: number | string
  spaceMainBefore?: number | string
  spaceMainAfter?: number | string
  spaceCross?: number | string
  spaceCrossStart?: number | string
  spaceCrossEnd?: number | string
  spaceCrossBefore?: number | string
  spaceCrossAfter?: number | string
  spaceBetween?: number | string
  position?: string
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
      space,
      spaceMain,
      spaceMainStart,
      spaceMainEnd,
      spaceMainBefore,
      spaceMainAfter,
      spaceCross,
      spaceCrossStart,
      spaceCrossEnd,
      spaceCrossBefore,
      spaceCrossAfter,
      spaceBetween,
      spaceBefore,
      spaceAfter,
      spaceStart,
      spaceEnd,
      background,
      position = 'relative',
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
          ? 'max-content'
          : React.isValidElement(element)
          ? element.props.width ??
            element.props.height ??
            element.props.size ??
            'min-content'
          : null,
      }
      const spaceValue =
        (React.isValidElement(previousElement) &&
          previousElement?.props.spaceMainAfter) ??
        (React.isValidElement(element) && element.props.spaceMainBefore) ??
        spaceBetween ??
        space
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
    const spaceMainStartValue = spaceMainStart ?? spaceMain ?? space
    const spaceMainEndValue = spaceMainEnd ?? spaceMain ?? space
    const spaceCrossStartValue = spaceCrossStart ?? spaceCross ?? space
    const spaceCrossEndValue = spaceCrossEnd ?? spaceCross ?? space
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

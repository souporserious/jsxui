import * as React from 'react'

import { StackContext } from './Contexts'
import { Divider } from './Divider'
import { DefaultProps } from './index'
import { jsx } from './jsx'
import { Spacer } from './Spacer'
import { Text } from './Text'
import { useTokens } from './Tokens'
import { useLayoutStyles } from './use-layout-styles'
import { parseValue, isSameInstance } from './utils'

export type SpaceValue = number | string | React.ReactNode

export type StackOwnProps = {
  /** Changes the underlying rendered element. */
  as?: any

  /** The axis along which children are positioned. */
  axis?: 'horizontal' | 'vertical'

  /** Defines the width of the view area. */
  width?: number | string

  /** Defines the height of the view area. */
  height?: number | string

  /** Shortcut to set both width and height. */
  size?: number | string

  /** Shortcut to set all space props. */
  space?: SpaceValue

  /** Defines space along the main axis. */
  spaceMain?: SpaceValue

  /** Defines space along the main start axis. */
  spaceMainStart?: SpaceValue

  /** Defines space along the main end axis. */
  spaceMainEnd?: SpaceValue

  /** Defines space along the cross axis. */
  spaceCross?: SpaceValue

  /** Defines space along the cross start axis. */
  spaceCrossStart?: SpaceValue

  /** Defines space along the cross end axis. */
  spaceCrossEnd?: SpaceValue

  /** Defines space between child views. */
  spaceBetween?: SpaceValue

  /** Overrides the parent defined cross start space. */
  spaceBefore?: SpaceValue

  /** Overrides the parent defined cross end space. */
  spaceAfter?: SpaceValue

  /** Shortcut to set all radius props. */
  radius?: number

  /** Defines top left radius. */
  radiusTopLeft?: number

  /** Defines top right radius. */
  radiusTopRight?: number

  /** Defines bottom left radius. */
  radiusBottomLeft?: number

  /** Defines bottom right radius. */
  radiusBottomRight?: number

  /** Defines offset along the x-axis. */
  offsetX?: string | number

  /** Defines offset along the y-axis. */
  offsetY?: string | number

  /** Defines translation transforms along the x-axis. */
  translateX?: string | number

  /** Defines translation transforms along the y-axis. */
  translateY?: string | number

  /** Defines scale equal scale transforms. */
  scale?: number

  /** Defines scale transforms along the x-axis. */
  scaleX?: number

  /** Defines scale transforms along the y-axis. */
  scaleY?: number

  /** Defines view stroke weight. */
  strokeWeight?: number

  /** Defines view stroke color. */
  strokeColor?: string

  /** Defines view background. */
  background?: string | React.ReactNode

  style?: React.CSSProperties

  children?: React.ReactNode
}

export type StackProps<E extends React.ElementType> = DefaultProps<
  E,
  StackOwnProps
>

const defaultElement = 'div'

function joinChildren(children, separator: any = ', ') {
  const childrenArray = React.Children.toArray(children)
  const lastChildIndex = childrenArray.length - 1
  return childrenArray.reduce((result: any, child: any, index) => {
    if (isSameInstance(child, separator)) {
      const nextResult = [...result]
      nextResult.pop()
      return nextResult.concat(child)
    } else if (index < lastChildIndex) {
      return result.concat([
        child,
        typeof separator === 'string'
          ? separator
          : React.cloneElement(separator, { key: index + '-separator' }),
      ])
    } else {
      return result.concat(child)
    }
  }, [])
}

function parseSpaceValue(value) {
  return typeof value === 'string' || typeof value === 'number'
    ? jsx(Spacer, { size: value })
    : value
}

function getOrthogonalAxis(axis) {
  return axis === 'horizontal' ? 'vertical' : 'horizontal'
}

type TransformValue = {
  scale?: number
  scaleX?: number
  scaleY?: number
  translateX?: number | string
  translateY?: number | string
}

function getTransformValue({
  scale,
  scaleX = 1,
  scaleY = 1,
  translateX = 0,
  translateY = 0,
}: TransformValue) {
  return `translate(${parseValue(translateX)}, ${parseValue(
    translateY
  )}) scale(${scaleX ?? scale}, ${scaleY ?? scale})`
}

export function getStackChildStyles({ width, height }) {
  const style = {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 0,
  } as any
  if (typeof width === 'string' && width.includes('fr')) {
    style.flexGrow = parseFloat(width)
  } else {
    style.width = width
    style.flexBasis = width
  }
  if (typeof height === 'string' && height.includes('fr')) {
    style.flexGrow = parseFloat(height)
  } else {
    style.height = height
    style.flexBasis = height
  }
  if (style.flexGrow > 0) {
    style.flexBasis = 0
  }
  return style
}

export const Stack = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    props: StackProps<E>,
    ref
  ) => {
    const mainAxis = React.useContext(StackContext)
    const {
      as: Component = 'div',
      axis = 'vertical',
      size,
      width,
      height,
      space,
      spaceMain,
      spaceMainStart,
      spaceMainEnd,
      spaceCross,
      spaceCrossStart,
      spaceCrossEnd,
      spaceBetween,
      spaceBefore,
      spaceAfter,
      strokeWeight,
      strokeColor,
      background,
      radius = 0,
      radiusTopLeft,
      radiusTopRight,
      radiusBottomLeft,
      radiusBottomRight,
      scale,
      scaleX,
      scaleY,
      translateX,
      translateY,
      children,
      visible = true,
      style: _style,
      ...restProps
    } = props
    const { colors } = useTokens()
    const flattenedChildren = React.Children.toArray(children)
      .flatMap((child: any) =>
        child && child.type === React.Fragment ? child.props.children : child
      )
      .filter(
        (child) =>
          // @ts-ignore
          React.isValidElement(child) && child.props.visible !== false
      )
    const layoutStyles = useLayoutStyles(
      (mainAxis === 'horizontal' ? width : height) ?? size
    )
    const style = {
      display: 'flex',
      flexDirection: axis === 'horizontal' ? 'row' : 'column',
      boxShadow:
        strokeWeight ?? strokeColor
          ? `inset 0px 0px 0px ${strokeWeight}px ${strokeColor}`
          : undefined,
      borderRadius: [
        parseValue(radiusTopLeft ?? radius),
        parseValue(radiusTopRight ?? radius),
        parseValue(radiusBottomRight ?? radius),
        parseValue(radiusBottomLeft ?? radius),
      ].join(' '),
      background:
        typeof background === 'string'
          ? colors[background] || background
          : undefined,
      transform: getTransformValue({
        scale,
        scaleX,
        scaleY,
        translateX,
        translateY,
      }),
      position: 'relative',
      zIndex: 1,
      width: width ?? size,
      height: height ?? size,
      ...layoutStyles,
      ..._style,
    }
    const childrenToRender =
      spaceCrossStart ?? spaceCrossEnd ?? spaceCross ?? space
        ? flattenedChildren.map((child: any, index) => {
            return isSameInstance(child, [Spacer, Divider]) ? (
              child
            ) : (
              <StackContext.Provider
                key={index}
                value={getOrthogonalAxis(axis)}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: axis === 'horizontal' ? 'column' : 'row',
                    ...getStackChildStyles({
                      width:
                        axis === 'horizontal'
                          ? child.props.width ??
                            (child.type === Text ? 'auto' : child.props.size)
                          : 'auto',
                      height:
                        axis === 'horizontal'
                          ? 'auto'
                          : child.props.height ??
                            (child.type === Text ? 'auto' : child.props.size),
                    }),
                    // Can we be smart here and split layout props so we can pass them to the wrappers we create?
                    ...child.props.style,
                  }}
                >
                  {parseSpaceValue(
                    child.props.spaceBefore ??
                      spaceCrossStart ??
                      spaceCross ??
                      space
                  )}
                  {React.cloneElement(child, {
                    style: getStackChildStyles({
                      width:
                        axis === 'horizontal'
                          ? 'auto'
                          : child.props.width ??
                            (child.type === Text ? 'auto' : child.props.size),
                      height:
                        axis === 'horizontal'
                          ? child.props.height ??
                            (child.type === Text ? 'auto' : child.props.size)
                          : 'auto',
                    }),
                  })}
                  {parseSpaceValue(
                    child.props.spaceAfter ??
                      spaceCrossEnd ??
                      spaceCross ??
                      space
                  )}
                </div>
              </StackContext.Provider>
            )
          })
        : flattenedChildren

    if (visible === false) {
      return null
    }

    return (
      <StackContext.Provider value={axis}>
        <Component ref={ref} style={style} {...restProps}>
          {React.isValidElement(background) && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              {background}
            </div>
          )}
          {parseSpaceValue(spaceMainStart ?? spaceMain ?? space)}
          {spaceBetween
            ? joinChildren(childrenToRender, parseSpaceValue(spaceBetween))
            : childrenToRender}
          {parseSpaceValue(spaceMainEnd ?? spaceMain ?? space)}
        </Component>
      </StackContext.Provider>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: StackProps<E>
) => React.ReactElement

// @ts-ignore
Stack.displayName = 'Stack'

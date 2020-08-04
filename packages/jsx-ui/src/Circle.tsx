import * as React from 'react'

import { parseValue } from './utils'

export type Constraint = 'start' | 'end' | 'center'

export type PositionProps = {
  positionX?: number
  positionY?: number
  constraintX?: Constraint
  constraintY?: Constraint
}

export type CircleProps = {
  size?: number
  translateX?: number
  translateY?: number
  fill?: string
  stroke?: string
  strokeSize?: number
} & PositionProps

function getConstraints({
  positionX,
  positionY,
  constraintX = 'start',
  constraintY = 'start',
}: PositionProps) {
  const style = {
    position: positionX ?? positionY ? 'absolute' : 'relative',
  } as any
  if (constraintX === 'start') {
    style.left = positionX
  } else if (constraintX === 'center') {
    style.left = `calc(50% + ${positionX}px)`
  } else if (constraintX === 'end') {
    style.left = `calc(100% + ${positionX}px)`
  }
  if (constraintY === 'start') {
    style.top = positionY
  } else if (constraintY === 'center') {
    style.top = `calc(50% + ${positionY}px)`
  } else if (constraintY === 'end') {
    style.top = `calc(100% + ${positionY}px)`
  }
  return style
}

export function Circle({
  size = 50,
  translateX = 0,
  translateY = 0,
  positionX,
  positionY,
  constraintX,
  constraintY,
  fill,
  stroke,
  strokeSize,
}: CircleProps) {
  const constraintStyles = getConstraints({
    positionX,
    positionY,
    constraintX,
    constraintY,
  })
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        ...constraintStyles,
        transform: `translate(${parseValue(translateX)}, ${parseValue(
          translateY
        )})`,
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={fill || (stroke && 'none')}
        stroke={stroke}
        strokeWidth={strokeSize || (stroke && 1)}
      />
    </svg>
  )
}

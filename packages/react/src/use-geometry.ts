import * as React from 'react'

type Geometry = {
  ref: { current?: any }
  width: { current?: number }
  height: { current?: number }
  minX: { current?: number }
  midX: { current?: number }
  maxX: { current?: number }
  minY: { current?: number }
  midY: { current?: number }
  maxY: { current?: number }
}

export function useGeometry(ref?: any): Geometry {
  const localRef = React.useRef()
  const width = React.useRef(0)
  const height = React.useRef(0)
  const minX = React.useRef(0)
  const midX = React.useRef(0)
  const maxX = React.useRef(0)
  const minY = React.useRef(0)
  const midY = React.useRef(0)
  const maxY = React.useRef(0)

  React.useLayoutEffect(() => {
    const bounds = (ref || localRef).current.getBoundingClientRect()
    width.current = bounds.width
    height.current = bounds.height
    minX.current = bounds.left
    midX.current = bounds.left + bounds.width / 2
    maxX.current = bounds.right
    minY.current = bounds.top
    midY.current = bounds.top + bounds.height / 2
    maxY.current = bounds.bottom
  })

  return {
    ref: ref || localRef,
    width,
    height,
    minX,
    midX,
    maxX,
    minY,
    midY,
    maxY,
  }
}

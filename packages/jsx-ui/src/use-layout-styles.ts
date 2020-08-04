import * as React from 'react'

import { StackContext } from './Contexts'

export function useLayoutStyles(value, axis?: 'vertical' | 'horizontal') {
  const mainAxis = React.useContext(StackContext)
  const mainDimension = (axis || mainAxis) === 'horizontal' ? 'Width' : 'Height'
  const style = {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  } as any
  if (typeof value === 'string' && value.includes('minmax')) {
    const [min, max] = value
      .split('minmax(')[1]
      .split(')')[0]
      .split(',')
      .map(value => value.trim())
    if (min.includes('fr')) {
      throw new Error(
        'Fractional minimums cannot exist. Use a maximum fraction "minmax(16px, 1fr)".'
      )
    } else {
      style[`min${mainDimension}`] = min
    }
    if (max.includes('fr')) {
      const maxFloat = parseFloat(max)
      if (maxFloat < 0) {
        throw new Error(
          'Negative fractions cannot exist. Use a positive fraction.'
        )
      }
      style.flexGrow = maxFloat
    } else {
      style[`max${mainDimension}`] = max
    }
  } else if (typeof value === 'string' && value.includes('fr')) {
    const float = parseFloat(value)
    if (float < 0) {
      throw new Error(
        'Negative fractions cannot exist. Use a positive fraction.'
      )
    }
    style.flexGrow = parseFloat(value)
  } else {
    style[mainDimension.toLowerCase()] = value
  }
  if (style.flexGrow > 0) {
    style.flexBasis = 0
  }
  return style
}

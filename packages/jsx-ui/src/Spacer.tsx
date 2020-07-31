import * as React from 'react'

import { StackContext } from './Contexts'
import { useModifierProps } from './Modifiers'
import { useTokens } from './Tokens'
import { useVariantProps } from './Variants'

type SpacerProps = {
  size?: number | string
  variants?: any
  visible?: boolean | string
  children?: React.ReactNode
}

function parseMinMax(definition) {
  return definition
    .split('minmax(')[1]
    .split(')')[0]
    .split(',')
    .map(value => value.trim())
}

export function Spacer(props: SpacerProps) {
  const modifiedProps = useModifierProps<SpacerProps>(Spacer, props)
  const { children, size, visible = true } = useVariantProps<SpacerProps>(
    modifiedProps
  )
  const { fontFamilies } = useTokens()
  const parentAxis = React.useContext(StackContext)
  const mainDimension = parentAxis === 'horizontal' ? 'Width' : 'Height'
  const style = {
    position: 'relative',
    fontFamily: fontFamilies.body,
  } as any

  if (visible === false) {
    return null
  }

  if (typeof size === 'string' && size.includes('minmax')) {
    const [min, max] = parseMinMax(size)
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
    if (min.includes('fr')) {
      throw new Error(
        'Fractional minimums cannot exist. Use a maximum fraction "minmax(16px, 1fr)".'
      )
    } else {
      style[`min${mainDimension}`] = min
    }
  } else if (typeof size === 'string' && size.includes('fr')) {
    style.flex = `${parseFloat(size)} 1 0`
  } else {
    style[`min${mainDimension}`] = size
  }

  return (
    <div style={style}>
      {typeof children === 'function'
        ? children({ size, parentAxis })
        : children}
    </div>
  )
}

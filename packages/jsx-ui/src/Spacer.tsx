import * as React from 'react'

import { StackContext } from './Contexts'
import { useModifierProps } from './Modifiers'
import { useTokens } from './Tokens'
import { useVariantProps } from './Variants'
import { useLayoutStyles } from './use-layout-styles'

type SpacerProps = {
  size?: number | string
  variants?: any
  visible?: boolean | string
  children?: React.ReactNode
}

export function Spacer(props: SpacerProps) {
  const modifiedProps = useModifierProps<SpacerProps>(Spacer, props)
  const { children, size, visible = true } = useVariantProps<SpacerProps>(
    modifiedProps
  )
  const { fontFamilies } = useTokens()
  const parentAxis = React.useContext(StackContext)
  const layoutStyles = useLayoutStyles(size)

  if (visible === false) {
    return null
  }

  return (
    <div
      style={{
        position: 'relative',
        fontFamily: fontFamilies.body,
        ...layoutStyles,
      }}
    >
      {typeof children === 'function'
        ? children({ size, parentAxis })
        : children}
    </div>
  )
}

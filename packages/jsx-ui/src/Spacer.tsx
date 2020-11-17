import * as React from 'react'

import { StackContext } from './Contexts'
import { useOverrideProps } from './Overrides'
import { useTokens } from './Tokens'
import { useVariantProps } from './Variants'
import { useLayoutStyles } from './use-layout-styles'

type SpacerProps = {
  size?: number | string
  background?: string
  variants?: any
  visible?: boolean | string
  children?: React.ReactNode
}

export function Spacer(props: SpacerProps) {
  const modifiedProps = useOverrideProps(Spacer, props)
  const {
    children,
    size = '1fr',
    background,
    visible = true,
  } = useVariantProps(modifiedProps)
  const { fontFamilies } = useTokens()
  const mainAxis = React.useContext(StackContext)
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
      {background ? (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0 }}
        >
          <rect width="100%" height="100%" fill={background} />
        </svg>
      ) : null}
      {typeof children === 'function' ? children({ size, mainAxis }) : children}
    </div>
  )
}

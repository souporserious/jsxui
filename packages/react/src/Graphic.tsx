import * as React from 'react'

import { useOverrideProps } from './Overrides'
import { useTokens } from './Tokens'
import { useVariantProps } from './Variants'
import { SharedProps } from './index'

export type GraphicProps = {
  name?: string
  scale?: number | 'auto'
  children?: React.ReactNode
} & SharedProps

export function Graphic(props) {
  const overrideProps = useOverrideProps(Graphic, props)
  const {
    children,
    name,
    scale,
    visible = true,
    stackChildStyles,
    style,
    // width,
    // height,
    ...restProps
  } = useVariantProps(overrideProps)
  const { graphics } = useTokens()
  // if (scale === 'auto') {
  //   style.preserveAspectRatio = 'xMinYMin meet'
  //   style.shapeRendering = 'crispEdges'
  // } else {
  //   style.width = width * scale
  //   style.height = height * scale
  // }
  return (
    <svg {...restProps} style={{ ...style, ...stackChildStyles }}>
      {children}
    </svg>
  )
}

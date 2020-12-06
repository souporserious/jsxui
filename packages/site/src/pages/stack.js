import React from 'react'
import { Graphic, Overrides, Stack, Text } from '@jsxui/react'
import { Link } from 'gatsby'

function Rectangle({ size, width, height, fill }) {
  return (
    <Graphic
      width={size ?? width}
      height={size ?? height}
      viewBox={`0 0 ${size ?? width} ${size ?? height}`}
    >
      <rect
        width={size ?? width}
        height={size ?? height}
        x={0}
        y={0}
        fill={fill}
      />
    </Graphic>
  )
}

export default function Index() {
  return (
    <Stack height="100vh" space="1fr" spaceBetween="32px">
      <Overrides value={[<Text width="1fr" />]}>
        <Stack
          axis="y"
          spaceX="16px"
          spaceBetween="16px"
          background="pink"
          variants={{
            'breakpoints.medium': {
              axis: 'x',
              spaceBetween: '8px',
            },
          }}
        >
          <Text>Hello</Text>
          <Text width="200px">Hello</Text>
          <Text>Hello</Text>
        </Stack>
      </Overrides>
      {/* <Overrides value={[<Rectangle width="24px" fill="purple" />]}>
        <Stack
          axis="y"
          spaceX="16px"
          spaceBetween="16px"
          background="pink"
          variants={{
            'breakpoints.medium': {
              axis: 'x',
              spaceBetween: '8px',
            },
          }}
        >
          <Rectangle size={24} />
          <Rectangle size={24} fill="red" />
        </Stack>
      </Overrides> */}
      {/* <Stack axis="x" spaceBetween="16px">
        <Rectangle size={24} fill="blue" />
        <Rectangle size={24} fill="blue" />
        <Rectangle size={24} fill="blue" />
      </Stack> */}
    </Stack>
  )
}

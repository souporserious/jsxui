import React from 'react'
import { Stack, Text, View } from 'jsx-ui'

const sizes = {
  xs: 12,
  sm: 18,
  md: 22,
  lg: 32,
}

const sizeKeys = Object.keys(sizes)

function Heading({ children, level = 1 }) {
  return <Text size={sizes[sizeKeys[level]]}>{children}</Text>
}

export default () => {
  return (
    <Stack>
      <Heading level={1} style={{}}>
        JSX UI
      </Heading>
      <Text>
        Primitive elements to build isomorphic user interfaces in React.
      </Text>
    </Stack>
  )
}

import React from 'react'
import { Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

export default ({ style }) => {
  return (
    <Stack
      as={Link}
      to="/users"
      alignment="center"
      spaceStart="1fr"
      spaceEnd="1fr"
      height="100vh"
      space="1fr"
      style={style}
    >
      <Text>Press the PS button to use the controller.</Text>
    </Stack>
  )
}

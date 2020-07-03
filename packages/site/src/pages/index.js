import React from 'react'
import { Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

export default ({ style }) => {
  return (
    <Stack as={Link} to="/users" height="100vh" spaceAround="1fr" style={style}>
      <Text>Press the PS button to use the controller.</Text>
    </Stack>
  )
}

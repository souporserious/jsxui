import React from 'react'
import { Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

export default function Index() {
  return (
    <Stack height="100vh" space="1fr" spaceBetween="32px">
      <Text size="large">Examples</Text>
      <Text as={Link} to="playstation">
        Playstation
      </Text>
      <Text as={Link} to="collab">
        Collab
      </Text>
      <Text as={Link} to="dashboard">
        Dashboard
      </Text>
    </Stack>
  )
}

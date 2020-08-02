import React from 'react'
import { Stack, Text, Spacer } from 'jsx-ui'
import { Link } from 'gatsby'

function Graphic() {
  return '🔍'
}

function Button({ title }) {
  return (
    <Stack width={180} height={72} space="1fr" radius={20} background="#FAB8C4">
      <Text size={16} weight={500} color="#2522BA">
        {title}
      </Text>
    </Stack>
  )
}

export default function Index() {
  return (
    <Stack height="100vh" spaceCross="minmax(16px, 1fr)" spaceMainStart="16px">
      <Stack axis="horizontal" width="minmax(320px, 1140px)" spaceCross="1fr">
        <Text>Collab</Text>
        <Spacer size={60} />
        <Stack axis="horizontal" spaceBetween={20}>
          {['Features', 'Pricing', 'Tours', 'Explore'].map((link) => (
            <Text key={link}>{link}</Text>
          ))}
        </Stack>
        <Spacer size="minmax(16px, 1fr)" />
        <Graphic name="search" />
        <Spacer size={16} />
        <Button title="Get Started" />
      </Stack>
      <Spacer size={64} />
      <Text width={300} size={72} spaceAfter="3fr">
        Create Like Never Before.
      </Text>
      <Text width={360} size={16} spaceAfter="3fr">
        Create, build, collaborate and ship products faster. Good bye code! 👋
      </Text>
      <Stack axis="horizontal">
        <Button title="Get Started" />
        <Button title="See It In Action!" />
      </Stack>
    </Stack>
  )
}

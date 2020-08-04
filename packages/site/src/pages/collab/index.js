import React from 'react'
import { Circle, Stack, Text, Spacer, Modifiers } from 'jsx-ui'
import { Link } from 'gatsby'

// based on: https://dribbble.com/shots/13922164-Collab-Landing-Page-Kit-I

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

function Frame({ children }) {
  return <Stack>{children}</Stack>
}

// const geometry = useGeometry({ x: 100 }) // origin? How do we position something like bottom-start?
// <HStack geometery={geometry} />
// <HStack position={{ x: geometry.x }} />

// const guide = useGuide({ x: 100 })
// <HStack position={guide} />
// <HStack position={guide} />

export default function Index() {
  return (
    <Stack
      height="100vh"
      background={
        <Frame>
          <Circle size={400} positionX={-200} positionY={-200} fill="#FFDC60" />
          <Circle size={48} positionX={200} positionY={200} fill="#FAB8C4" />
          <Circle
            size={128}
            positionX={-200}
            positionY={-200}
            constraintX="center"
            fill="#FFDC60"
          />
          <Circle
            size={32}
            positionX={-200}
            positionY={100}
            constraintX="center"
            fill="#5956E9"
          />
          <Circle
            size={1200}
            positionX={-600}
            positionY={-600}
            constraintX="end"
            fill="#5956E9"
          />
        </Frame>
      }
    >
      <Stack axis="horizontal">
        <Spacer />
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
        <Spacer />
      </Stack>

      <Spacer size={64} />

      <Stack axis="horizontal">
        <Spacer />
        <Text size={72} weight={600}>
          Create
          <br />
          Like
          <br />
          Never
          <br />
          Before.
        </Text>
        <Spacer size="3fr" />
      </Stack>

      <Spacer size={32} />

      <Stack axis="horizontal">
        <Spacer />
        <Text width={360} size={16}>
          Create, build, collaborate and ship products faster. Good bye code! 👋
        </Text>
        <Spacer size="3fr" />
      </Stack>

      <Spacer size={48} />

      <Stack axis="horizontal">
        <Button title="Get Started" />
        <Button title="See It In Action!" />
      </Stack>

      <Modifiers value={[[Text, { color: 'white' }]]}>
        <Stack
          background={
            <Stack width="100%" height="100%" background="#27272E">
              <Circle
                size={500}
                stroke="#525260"
                positionX={-420}
                constraintX="center"
              />
              <Circle
                size={268}
                fill="#525260"
                positionX={-600}
                positionY={150}
                constraintX="end"
              />
            </Stack>
          }
        >
          <Spacer size={200} />
          <Stack axis="horizontal">
            <Spacer size="minmax(32px, 1fr)" />
            <Text size={12} weight={500}>
              Features
            </Text>
            <Spacer size="minmax(32px, 120px)" />
            <Stack width={680}>
              <Text size={48} weight={500}>
                The world’s most powerful design tool.
              </Text>
              <Spacer size={60} />
              <Text size={16} width={560} color="rgba(255, 255, 255, 0.5)">
                Simultaneously design, code and collaborate with your team all
                from one place.
              </Text>
            </Stack>
            <Spacer size="1fr" />
          </Stack>
          <Spacer size={200} />
        </Stack>
      </Modifiers>
    </Stack>
  )
}

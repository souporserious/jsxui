import React from 'react'
import { Stack, Text, useGeometry } from 'jsx-ui'
import { useRovingIndex } from 'use-roving-index'
import { Link } from 'gatsby'

const menuItems = [
  {
    title: `Playstation®Store`,
  },
  {
    title: `What's New`,
  },
  {
    title: `Overwatch: Origins Edition`,
  },
  {
    title: `Horizon Zero Dawn`,
  },
  {
    title: `TV & Video`,
  },
]

export default () => {
  const {
    activeIndex,
    moveActiveIndex,
    moveBackwardDisabled,
    moveForwardDisabled,
  } = useRovingIndex({
    defaultIndex: 1,
    maxIndex: menuItems.length - 1,
  })
  // const stackGeometry = useGeometry()
  // const textGeometry = useGeometry()
  return (
    <Stack height="100vh" spaceAround="minmax(16px, 1fr)" spaceBetween="32px">
      <Stack axis="horizontal" spaceMain="1fr" spaceBetween="32px">
        {[...Array(11).keys()].map((value) => (
          <Stack key={value} size={24} background="white" />
        ))}
      </Stack>
      <Stack
        axis="horizontal"
        width="100%"
        spaceMain={32}
        spaceBetween={4}
        translateX={
          activeIndex > 0 ? (activeIndex - 1) * -204 - 208 : undefined
        }
      >
        {menuItems.map((item, index) => (
          <Stack
            key={item.title}
            as={Link}
            to="/add-to-folder"
            // ref={index === activeIndex ? stackGeometry : undefined}
            width={index === activeIndex ? 400 : 200}
            height={index === activeIndex ? 450 : 200}
            spaceBefore={index === activeIndex ? 8 : undefined}
            spaceAfter={index === activeIndex ? 8 : undefined}
            background="#1a42ab"
          >
            <Stack
              width={index === activeIndex ? 400 : 200}
              height={index === activeIndex ? 400 : 200}
              background="pink"
            />
            {index === activeIndex && (
              <Text
                // ref={textGeometry}
                // offsetX={stackGeometry.maxX}
                // offsetY={stackGeometry.maxY}
                offsetX={0}
                offsetY="calc(100% + 8px)"
                size={40}
                color="white"
              >
                {item.title}
              </Text>
            )}
          </Stack>
        ))}
      </Stack>
      <Stack axis="horizontal">
        <button
          disabled={moveBackwardDisabled}
          onClick={() => moveActiveIndex(-1)}
        >
          Previous
        </button>
        <button
          disabled={moveForwardDisabled}
          onClick={() => moveActiveIndex(1)}
        >
          Next
        </button>
      </Stack>
    </Stack>
  )
}

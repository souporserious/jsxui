import React from 'react'
import { Image, Spacer, Stack, Text } from 'jsx-ui'
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
    setActiveIndex,
  } = useRovingIndex({ maxIndex: menuItems.length - 1 })
  return (
    <Stack height="100vh" spaceAround="1fr" spaceBetween="32px">
      <Stack axis="horizontal" spaceMain="1fr" spaceBetween="32px">
        {[...Array(11).keys()].map((value) => (
          <Stack key={value} size={24} background="white" />
        ))}
      </Stack>
      <Stack
        axis="horizontal"
        width="100%"
        spaceMain="32px"
        spaceBetween="4px"
        x={`${activeIndex * -200}px`}
        style={{ overflow: 'hidden' }}
        // background={{
        //   enter: {
        //     value: '#000',
        //     type: 'spring',
        //   },
        //   leave: {
        //     value: '#fff',
        //     type: 'spring',
        //   },
        // }}
      >
        {menuItems.map((item, index) => (
          <Stack
            key={item.title}
            // as={Link}
            // to="/add-to-folder"
            width={index === activeIndex ? 400 : 200}
            height={index === activeIndex ? 450 : 200}
            spaceMainBefore={index === activeIndex ? 8 : undefined}
            spaceMainAfter={index === activeIndex ? 8 : undefined}
            spaceCrossBefore={index === 1 ? 32 : undefined}
            background="#1a42ab"
          >
            <Stack
              width={index === activeIndex ? 400 : 200}
              height={index === activeIndex ? 400 : 200}
              // background="pink"
            />
            <Stack
              visible={index === activeIndex}
              axis="horizontal"
              width="100%"
              height="100%"
              spaceMainStart="1fr"
              spaceCrossStart="1fr"
              // relativeOrigin="20px 30px"
              // relativeTo="parent"
            >
              <Text
                size={40}
                //x="calc(100% + 16px)"
                style={{ color: 'white' }}
              >
                {item.title}
              </Text>
            </Stack>
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

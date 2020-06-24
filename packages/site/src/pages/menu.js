import React from 'react'
import { Image, Spacer, Stack, Text } from 'jsx-ui'
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
  return (
    <Stack height="100vh" space="1fr" spaceBetween="32px">
      <Stack>
        <Stack
          axis="horizontal"
          spaceMainStart="1fr"
          spaceMainEnd="1fr"
          spaceBetween="32px"
        >
          {[...Array(11).keys()].map((value) => (
            <Stack key={value} size={24} background="white" />
          ))}
        </Stack>
      </Stack>
      <Stack
        axis="horizontal"
        spaceMainStart="32px"
        spaceMainEnd="32px"
        spaceBetween="4px"
      >
        {menuItems.map((item, index) => (
          <Stack
            key={item.title}
            // as={Link}
            // to="/add-to-folder"
            width={index === 1 ? 400 : 200}
            height={index === 1 ? 450 : 200}
            spaceMainBefore={index === 1 ? 8 : undefined}
            spaceMainAfter={index === 1 ? 8 : undefined}
            background="#1a42ab"
          >
            <Stack
              width={index === 1 ? 400 : 200}
              height={index === 1 ? 400 : 200}
              background="pink"
            />
            <Stack
              visible={index === 1}
              axis="horizontal"
              position="absolute"
              width="100%"
              height="100%"
              spaceMainStart="1fr"
              spaceCrossStart="1fr"
            >
              <Text size={40} x="calc(100% + 16px)" style={{ color: 'white' }}>
                {item.title}
              </Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

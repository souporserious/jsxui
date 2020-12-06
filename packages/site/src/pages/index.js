import React from 'react'
import { Text, Tokens, Spacer, Stack, Overrides } from '@jsxui/react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { Github, Logo, Wave } from '../assets'

export default function Index() {
  return (
    <Tokens
      colors={{
        brand: '#8D6CEE',
        foreground: 'black',
        foregroundSecondary: 'gray',
      }}
      fontSizes={{
        xlarge: 32,
        large: 20,
        medium: 12,
      }}
      variants={{
        'breakpoints.medium': {
          fontSizes: {
            xlarge: 48,
            large: 28,
            medium: 16,
          },
        },
      }}
    >
      <Stack height="minmax(100vh, auto)">
        <Stack axis="x" spaceX="minmax(16px, 1fr)">
          <Stack
            width="minmax(auto, 960px)"
            spaceX="1fr"
            spaceYStart="16px"
            spaceYEnd="minmax(16px, 1fr)"
          >
            <Stack
              axis="x"
              width="1fr"
              spaceY="1fr"
              spaceBefore={0}
              spaceAfter={0}
            >
              <Logo width="auto" height="32px" />
              <Spacer />
              <Stack as="a" href="https://github.com/souporserious/jsxui">
                <Github />
              </Stack>
            </Stack>
            <Spacer
              size="80px"
              variants={{
                'breakpoints.medium': {
                  size: '80px',
                },
              }}
            />
            <Text
              width="1fr"
              size="xlarge"
              weight="900"
              lineSpacing={24}
              alignment="center"
              spaceBefore={0}
              spaceAfter={0}
              variants={{
                'breakpoints.medium': {
                  spaceBefore: 60,
                  spaceAfter: 60,
                },
              }}
            >
              Simple UI Primitives to Help Launch Your next&nbsp;Idea.
            </Text>
            <Spacer
              size="32px"
              variants={{
                'breakpoints.medium': {
                  size: '48px',
                },
              }}
            />
          </Stack>
        </Stack>
        <Wave width="1fr" height="auto" />
        <Stack
          axis="x"
          spaceYStart="40px"
          spaceYEnd="80px"
          background="#7B5AD9"
          variants={{
            xray: {
              background: 'url(#diagonalHatch)',
            },
            'breakpoints.large': {
              spaceX: '1fr',
              spaceBetween: 'minmax(24px, 0.5fr)',
            },
          }}
          // TODO: add X/YWrap components
          style={{ flexWrap: 'wrap' }}
        >
          {['Elements', 'Variants', 'Overrides', 'Editor'].map((name) => (
            <Stack
              key={name}
              width="50%"
              spaceX="1fr"
              spaceBetween="24px"
              variants={{
                'breakpoints.large': {
                  width: '1fr',
                },
              }}
            >
              <Text
                size="large"
                alignment="center"
                letterSpacing="0.5px"
                color="white"
                opacity={0.75}
              >
                {name}
              </Text>
              <Text color="white">Coming Soon</Text>
            </Stack>
          ))}
        </Stack>
        <Spacer
          visible={false}
          variants={{
            'breakpoints.large': {
              visible: true,
              size: '80px',
              background: '#7B5AD9',
            },
          }}
        />
        <Overrides value={[<Text color="white" />]}>
          <Stack axis="x" spaceX="minmax(16px, 1fr)" background="#7B5AD9">
            <Stack axis="x" width="minmax(200px, 960px)" spaceBetween="32px">
              <Stack
                width="1fr"
                //spaceXStart="16px"
                spaceBetween="32px"
              >
                <Text size="large">Overrides</Text>
                <Text lineSpacing={16}>
                  Overrides are cascading props that allow changing a
                  component's default props in a tree of components and are
                  merged in before instance props. It is advised to use
                  overrides rather than `defaultProps` or default arguments when
                  you want to allow a user to control the default props of your
                  component.
                </Text>
              </Stack>
              <Stack width="1fr" background="#6d47d7">
                <LiveProvider code="<strong>Hello World!</strong>">
                  <LiveEditor />
                  <LiveError />
                  {/* <LivePreview /> */}
                </LiveProvider>
              </Stack>
            </Stack>
          </Stack>
        </Overrides>
        <Spacer size="minmax(80px, 1fr)" background="#7B5AD9" />
        <Overrides value={[<Text color="white" />]}>
          <Stack axis="x" spaceX="minmax(16px, 1fr)" background="#7B5AD9">
            <Stack axis="x" width="minmax(200px, 960px)" spaceBetween="32px">
              <Stack
                width="1fr"
                //spaceXStart="16px"
                spaceBetween="32px"
              >
                <Text size="large">Variants</Text>
                <Text lineSpacing={16}>
                  Variants allow aliasing a set of props that can be activated
                  and deactivated. These are helpful for things like:
                  <ul>
                    <li>Media Queries</li>
                    <li>A/B Testing</li>
                    <li>User Roles</li>
                  </ul>
                </Text>
              </Stack>
              <Stack width="1fr" background="#6d47d7">
                <LiveProvider code="<strong>Hello World!</strong>">
                  <LiveEditor />
                  <LiveError />
                  {/* <LivePreview /> */}
                </LiveProvider>
              </Stack>
            </Stack>
          </Stack>
        </Overrides>
        <Spacer size="minmax(80px, 1fr)" background="#7B5AD9" />
      </Stack>
    </Tokens>
  )
}

import React from 'react'
import { Modifiers, Text, Tokens, Stack } from 'jsx-ui'
import { motion, AnimatePresence } from 'framer-motion'

const tokens = {
  fontFamilies: {
    body: 'Muli',
  },
  fontSizes: {
    xsmall: 12,
    small: 14,
    medium: 24,
    large: 22,
    xlarge: 32,
  },
  fontWeights: {
    light: '300',
    medium: '400',
    bold: '700',
  },
  colors: {
    background: '#083cb6',
    foreground: 'white',
  },
}

const modifiers = [
  [
    Stack,
    {
      style: {
        // backgroundColor: 'pink',
      },
    },
  ],
  [
    Text,
    {
      family: 'body',
      size: 'medium',
      weight: 'light',
      color: 'white',
    },
  ],
]

const duration = 0.25

const variants = {
  initial: {
    scale: 1.1,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: 'beforeChildren',
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: duration },
  },
}

document.body.style.margin = '0px'

function Layout({ children, location }) {
  return (
    <Tokens value={tokens}>
      <Modifiers value={modifiers}>
        <Stack background="linear-gradient(-180deg, rgb(8, 60, 182), rgb(14, 30, 69))">
          <AnimatePresence>
            <Stack
              key={location.pathname}
              as={motion.div}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {children}
            </Stack>
          </AnimatePresence>
        </Stack>
      </Modifiers>
    </Tokens>
  )
}

export default Layout

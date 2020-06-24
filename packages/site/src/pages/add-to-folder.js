import React from 'react'
import { Divider, Image, Spacer, Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

function Field({ label, children, ...props }) {
  return (
    <Stack as="label" axis="horizontal" {...props}>
      <Text>{label}</Text>
      {children}
    </Stack>
  )
}

function TextInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}

function Button({ title }) {
  return <button>{title}</button>
}

// const sizes = {
//   small: {
//     spaceBetween: 1,
//   },
//   medium: {
//     spaceBetween: 2,
//   },
//   large: {
//     spaceBetween: 3,
//   },
// }

function Modifiers({ children }) {
  return children
}
function useViewport() {
  return {}
}

const variants = {
  heading1: {
    as: 'h1',
    fontSize: 40,
  },
  heading2: {
    as: 'h2',
    fontSize: 24,
  },
  heading3: {
    as: 'h3',
    fontSize: 18,
  },
}

export default ({ style }) => {
  const viewport = useViewport()
  return (
    <Stack height="100vh" style={style}>
      <Spacer size="32px" />
      <Stack axis="horizontal" spaceStart="64px" spaceEnd="1fr">
        <Text
          size="40px"
          // modifiers={[
          //   'heading1',
          //   // [viewport.matches('small'), { axis: 'horizontal' }], // serialize and split CSS and
          // ]}
        >
          Add to New Folder
        </Text>
      </Stack>
      <Spacer size="16px" />
      <Divider />
      <Field label="Name">
        <TextInput />
      </Field>
      <Field label="Number of items">
        <TextInput />
      </Field>
      <Field label="Content">
        <Button title="Select" />
      </Field>
      <Field label="Sort">
        <TextInput />
      </Field>
    </Stack>
  )
}

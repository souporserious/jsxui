import React from 'react'
import { Text, Stack } from '@jsxui/react'

function Field({ name, ...props }) {
  return (
    <Stack spaceBetween={16}>
      <Text as="label" htmlFor={name}>
        {name}
      </Text>
      <input name={name} id={name} {...props} />
    </Stack>
  )
}

function Button({ title }) {
  return (
    <Stack as="button" spaceX={16} spaceY={8} background="brand">
      <Text color="white">{title}</Text>
    </Stack>
  )
}

export default () => {
  return (
    <Stack width="100%" height="100vh" space="1fr">
      <Stack
        as="form"
        onChange={(event) => console.log(event.target.name, event.target.value)}
        width="1fr"
        space={32}
        spaceBetween={32}
        radius={8}
        strokeWeight={1}
        strokeColor="black"
      >
        <Text size={24}>Signup</Text>
        <Stack spaceBetween={16}>
          <Field name="Name" />
          <Field name="Email" type="email" />
          <Field name="Password" type="password" />
        </Stack>
        <Button title="Submit" />
      </Stack>
    </Stack>
  )
}

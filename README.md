# 🧩 JSX UI

Primitive elements to build isomorphic user interfaces in React.

## Usage

```jsx
import React from 'react'
import { Stack, Text } from 'jsx-ui'

export default () => {
  return (
    <Stack>
      <Text color="orange">JSX UI</Text>
    </Stack>
  )
}
```

TODO:

[ ] internalization (LTR)
[ ] accessibility
[ ] layout primitives
[ ] theming (styles, colors, space)
[ ] variants (make things like A/B testing / permissions / etc easy / how to turn something like DND on/off without loading extra code)
[ ] auto documentation
[ ] property controls

Thank you to [alitskevich](https://github.com/alitskevich) for the package name.

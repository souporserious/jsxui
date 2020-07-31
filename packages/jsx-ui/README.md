# JSXUI

### Tokens

Tokens are simple primitive values that are resused throughout the tree. While tokens may be of any value it is advised to keep these as root values and use `Variants` and `Modifiers` to apply or alias sets of tokens.

### Overrides

Overrides are cascading props that allow changing a component's default props in a tree of components and are merged in before instance props. It is advised to use overrides rather than `defaultProps` or default arguments when you want to allow a user to control the default props of your component.

In a simple example if we want to allow control over our `Button` props from `Modifiers` we can set the defaults in our `Modifiers` component.

```jsx
import { Overrides, useOverrideProps } from '@jsxui/react'

function Button({ title, variant, onClick }) {
  const overriddenProps = useOverrideProps({ variant })
  return <button style={overriddenProps.variant}>{title}</button>
}

const overrides = [[Button, { variant: 'default' }]

function App() {
  return (
    <Overrides value={overrides]}>
      <Button title="Hello Button" />
      <Button title="Hello Button" variant="brand" />
    </Overrides>
  )
}
```

### Variants

Variants allow aliasing a set of props that can be activated and deactivated.

### Stack

### Text

### Tokens

Tokens are simple primitive values that are resused throughout a tree of components. While tokens may be of any value, it is advised to keep these as root values and use `Variants` and `Overrides` to apply or alias sets of tokens that can be turned on/off.

### Overrides

Overrides are cascading props that allow changing a component's default props in a tree of components and are merged in before instance props. It is advised to use overrides rather than `defaultProps` or default arguments when you want to allow a user to control the default props of your component.

In a simple example, if we want to allow control over our `Button` props from `Overrides` we can set the defaults in our `Overrides` component:

```jsx
/** @jsx jsx */
import { jsx, Overrides } from '@jsxui/react'

const styles = {
  default: {
    background: 'gray'
  },
  brand: {
    background: 'blue'
  }
}

function Button({ appearance, title, onClick }) {
  return <button style={styles[appearance]} onClick={onClick}>{title}</button>
}

function App() {
  return (
    <Overrides value={<Button appearance="default" />]}>
      <Button title="Hello Button" />
      <Button title="Hello Button" appearance="brand" />
    </Overrides>
  )
}
```

Overrides work great with `Variants` since they allow defining and activating your own variants for any components within a tree.

### Variants

Variants allow aliasing a set of props that can be activated and deactivated.

These are helpful for things like:

- Media Queries
- A/B Testing
- User Roles

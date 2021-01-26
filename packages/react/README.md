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

#### Local

Components can define local variants. These are normally things like focus/hover/press states, but can be anything you want. Because they are defined statically, locally defined variants have the benefit of accepting a function that can utilize hooks.

```jsx
function Button({ title }) {
  return (
    <Stack
      as="button"
      axis="x"
      spaceX="minmax(16px, 1fr)"
      spaceY="16px"
      background="brand"
      style={{
        padding: 0,
        border: 'none',
        borderRadius: 3,
      }}
    >
      <Text weight={600} color="white">
        {title}
      </Text>
    </Stack>
  )
}

Button.variants = {
  hover: () => {
    const [hover, setHover] = React.useState(false)
    return [
      hover,
      {
        onMouseOver: () => setHover(true),
        onMouseOut: () => setHover(false),
      },
    ]
  },
  focus: () => {
    const [focus, setFocus] = React.useState(false)
    return [
      focus,
      {
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
      },
    ]
  },
}
```

#### Global

Global variants allow turning props on/off for a tree of components. Any element can utilize the `variants` prop to define the element's props for each respective variation.

```jsx
function App() {
  return (
    <Variants hover={true}>
      <div variants={{ hover: { style: { color: 'hotpink' } } }}>
        Hello Variants
      </div>
    </Variants>
  )
}
```

#### Media Queries

Variants have the ability to define media queries that will be converted to use [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

```jsx
function App() {
  return (
    <Variants dark="@media (prefers-color-scheme: dark)">
      <div
        style={{ background: 'white', color: 'black' }}
        variants={{
          dark: {
            style: { background: 'black', color: 'white' },
          },
        }}
      >
        Hello Variants
      </div>
    </Variants>
  )
}
```

#### Chaining

Variants can be chained using a colon. This is similar to chaining pseudo selectors in CSS. Props will only be applied when all variants in the chain are active. Local and global variants can be changed to offer fine grained control.

```jsx
<Text
  color="green.500"
  variants={{
    hover: {
      color: 'green.800',
    },
    dark: {
      color: 'green.200',
    },
    'dark:hover': {
      color: 'green.700',
    },
  }}
>
  Hello Text
</Text>
```

### Modifiers

Modifiers allow aliasing a set of props that can be reused.

#### Local

```jsx
import { Modifiers, useModifierProps } from '@jsxui/react'

function Button({ title, ...props }) {
  const { spaceX, spaceY } = useModifierProps('button', props)
  return <button style={{ padding: `${spaceY} ${spaceX}` }}>{title}</button>
}

function App() {
  return (
    <Modifiers
      button={{
        primary: {
          background: 'brand',
          foreground: 'white',
        },
        'primary.outline': {
          strokeColor: 'brand',
          strokeWeight: 1,
        },
        'size.small': {
          spaceX: 1,
          spaceY: 2,
        },
        'size.medium': {
          spaceX: 1.5,
          spaceY: 3,
        },
        'size.large': {
          spaceX: 3,
          spaceY: 4,
        },
      }}
    >
      <Overrides value={[<Button modifiers="size.medium" />]}>
        <Button
          title="Hello Button"
          modifiers={['primary.outline', 'size.small']}
        />
      </Overrides>
    </Modifiers>
  )
}
```

#### Global

```jsx
const Heading = ({ level, children }) => (
  <Text modifiers={[`heading`, `heading${level}`]}>{children}</Text>
)
const App = () => (
  <Modifiers
    value={{
      heading: { color: 'foreground' },
      heading1: { size: 32 },
      heading2: { size: 24 },
      heading3: { size: 18 },
      body: { size: 16, color: 'foreground' },
    }}
  >
    <Heading level={1}>Heading 1</Heading>
    <Heading level={2}>Heading 2</Heading>
    <Heading level={3}>Heading 3</Heading>
    <Text modifiers="body">Body</Text>
  </Modifiers>
)
```

```jsx
const App = () => (
  <Variants dark="@media (prefers-color-scheme: dark)">
    <Theme
      colors={{ foreground: '#111', background: '#fff' }}
      variants={{
        dark: {
          colors: { foreground: '#eee', background: '#222' },
        },
      }}
    >
      <Modifiers body={{ size: 16, color: 'foreground' }}>
        <Overrides value={[<Text modifiers="body" />]}>
          <Text>Inherits "body" styles by default.</Text>
        </Overrides>
      </Modifiers>
    </Theme>
  </Variants>
)
```

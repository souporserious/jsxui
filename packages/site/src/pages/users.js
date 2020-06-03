import React from 'react'
import { Image, Spacer, Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

function useUsers(amount = 5) {
  const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${amount}`)
      .then((response) => response.json())
      .then(({ results }) => setUsers(results))
  }, [amount])
  return users
}

export default ({ style }) => {
  const users = useUsers()
  return (
    <Stack
      as={Link}
      to="/"
      alignment="center"
      spaceStart="1fr"
      spaceEnd="1fr"
      mainSize="100vh"
      style={style}
    >
      <Text>DUALSHOCK 4 wireless controller connected.</Text>
      <Spacer size="8px" />
      <Text>Who is using this controller?</Text>
      <Spacer size="64px" />
      <Stack axis="horizontal" spaceBetween="32px">
        {users.map((user, index) => (
          <Stack
            key={index}
            mainSize="256px"
            crossSize="180px"
            background="#1a42ab"
          >
            <Image
              source={user.picture.medium}
              width="180px"
              height="180px"
              style={{ objectFit: 'cover' }}
            />
            <Text>Name</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

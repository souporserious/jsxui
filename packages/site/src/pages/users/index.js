import React from 'react'
import { Image, Spacer, Stack, Text } from 'jsx-ui'
import { Link } from 'gatsby'

function useUsers(amount = 3) {
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
    <Stack height="100vh" spaceAround="1fr" style={style}>
      <Text>DUALSHOCK 4 wireless controller connected.</Text>
      <Spacer size={8} />
      <Text>Who is using this controller?</Text>
      <Spacer size={64} />
      <Stack axis="horizontal" spaceBetween="32px">
        <Stack
          as={Link}
          to="/users/new"
          width="180px"
          height="256px"
          spaceAround="1fr"
          background="#1a42ab"
        >
          <Text>New User</Text>
        </Stack>
        {users.map((user, index) => (
          <Stack
            key={index}
            as={Link}
            to="/menu"
            width="180px"
            height="256px"
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

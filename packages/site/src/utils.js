import faker from 'faker'

export function getData(amount) {
  const data = []
  for (let index = 0; index < amount; index++) {
    data.push({
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.random.number(),
      pastDue: faker.random.boolean(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      occupation: faker.name.jobTitle(),
    })
  }
  return data
}

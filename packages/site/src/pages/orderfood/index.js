import React from 'react'
import { Image, Stack, Text, Spacer, Divider, Modifiers } from 'jsx-ui'
import GoogleMap, { Marker } from 'react-maps-google'

function Button({ title }) {
  return (
    <Stack
      height={32}
      spaceMain="1fr"
      spaceCross={16}
      background="#1a73e8"
      radius={16}
    >
      <Text size={12} color="white">
        {title}
      </Text>
    </Stack>
  )
}

function Card({ title, children, ...restProps }) {
  return (
    <Stack
      space={24}
      radius={8}
      strokeColor="lightgray"
      strokeWeight={1}
      {...restProps}
    >
      {typeof title === 'string' ? (
        <Text size={14} weight={600}>
          {title}
        </Text>
      ) : (
        title
      )}
      <Spacer size={24} />
      {children}
    </Stack>
  )
}

export default function Index() {
  return (
    <Modifiers value={[[Divider, { color: 'lightgray' }]]}>
      <Stack height="100vh">
        <Stack
          axis="horizontal"
          spaceMainStart={32}
          spaceMainEnd={16}
          spaceCross={16}
        >
          <Text weight={500} spaceBefore="1fr" spaceAfter="1fr">
            Track your order
          </Text>
          <Spacer />
          <Image
            source="https://api.adorable.io/avatars/285"
            width={40}
            height={40}
            radius="circle"
          />
        </Stack>
        <Divider />
        <Stack
          width="1fr"
          height="1fr"
          spaceMain={24}
          spaceCross="minmax(16px, 1fr)"
        >
          <Stack
            axis="horizontal"
            width="minmax(320px, 1200px)"
            height="1fr"
            spaceBetween={16}
            style={{ minHeight: 0 }}
          >
            <Stack width="3fr" spaceBetween={16} style={{ overflow: 'auto' }}>
              <Card title="Pizza Port Carlsbad">
                <Text width="1fr" size={12}>
                  571 Carlsbad Village Dr, Carlsbad, CA 92008
                </Text>
                <Spacer size={20} />
                <Button title="Directions" />
              </Card>
              <Card
                title={
                  <Text size={14} weight={600}>
                    Pick up at{' '}
                    <Text size={14} color="#1a73e8" weight={600}>
                      6:02 PM
                    </Text>
                  </Text>
                }
              >
                <Text size={14}>Enjoy your food!</Text>
                <Spacer size={16} />
                <Text width="1fr" size={12} color="gray">
                  If there are any issues with your order, contact ChowNow using
                  the ‘Get help’ section below
                </Text>
              </Card>
              <Card title="Order details">
                <Text size={12} color="gray">
                  Large Pizza Bressi Ranch x 1
                </Text>
                <Spacer size={16} />
                <Text size={12} color="gray">
                  Total: $31.04
                </Text>
              </Card>
              <Card title="Order details">
                <Text size={14}>Order# 83308521</Text>
                <Spacer size={16} />
                <Text size={12} color="gray">
                  Order placed on Aug 5, 2020, 5:31 PM
                </Text>

                <Spacer size={32} />

                <Text size={14}>Pizza Port Carlsbad</Text>
                <Spacer size={16} />
                <Text size={12} color="gray">
                  571 Carlsbad Village Dr, Carlsbad, CA 92008
                </Text>

                <Spacer size={32} />

                <Stack axis="horizontal" width="1fr" spaceBetween="1fr">
                  <Text size={12} color="gray">
                    Large Pizza Bressi Ranch x 1
                  </Text>
                  <Text size={12} color="gray">
                    $24.25
                  </Text>
                </Stack>

                <Spacer size={16} />

                <Divider />

                <Spacer size={16} />

                <Stack axis="horizontal" width="1fr" spaceBetween="1fr">
                  <Text size={12} color="gray">
                    Subtotal
                  </Text>
                  <Text size={12} color="gray">
                    $24.25
                  </Text>
                </Stack>

                <Spacer size={16} />

                <Stack axis="horizontal" width="1fr" spaceBetween="1fr">
                  <Text size={12} color="gray">
                    Tax
                  </Text>
                  <Text size={12} color="gray">
                    $1.94
                  </Text>
                </Stack>

                <Spacer size={16} />

                <Stack axis="horizontal" width="1fr" spaceBetween="1fr">
                  <Text size={12} color="gray">
                    Tip
                  </Text>
                  <Text size={12} color="gray">
                    $4.85
                  </Text>
                </Stack>

                <Spacer size={16} />

                <Divider />

                <Spacer size={16} />

                <Stack axis="horizontal" width="1fr" spaceBetween="1fr">
                  <Text size={12} weight={700} color="gray">
                    Total:
                  </Text>
                  <Text size={12} weight={700} color="gray">
                    $31.04
                  </Text>
                </Stack>
              </Card>
            </Stack>
            <Stack
              width="4fr"
              height="1fr"
              radius={8}
              style={{ overflow: 'hidden' }}
            >
              <GoogleMap>
                <Marker
                  position={{
                    lat: 33.15988,
                    lng: -117.34773,
                  }}
                />
              </GoogleMap>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modifiers>
  )
}

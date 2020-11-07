import React from 'react'
import { Overrides, Stack, Text, Variants } from 'jsx-ui'
import { getData } from '../../utils'

function Cell({ children, ...props }) {
  return (
    <Stack {...props}>
      <Text>{children}</Text>
    </Stack>
  )
}

function Table({ columns, data, spacing }) {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: spacing,
        gridTemplateColumns: columns
          .map((column) => column.width || 'min-content')
          .join(' '),
      }}
    >
      {columns.map((column) => (
        <Text weight={600}>{column.header}</Text>
      ))}
      {data.map((row) =>
        columns.map((column, columnIndex) => (
          <Variants
            value={{
              firstCell: columnIndex === 0,
              lastCell: columnIndex === columns.length - 1,
              ...(typeof column.cellVariants === 'function'
                ? column.cellVariants(row)
                : column.cellVariants),
            }}
          >
            <Cell>
              {typeof column.cell === 'string'
                ? row[column.cell]
                : column.cell(row)}
            </Cell>
          </Variants>
        ))
      )}
    </div>
  )
}

const data = getData(50)

export default () => (
  <Overrides
    value={[
      [
        Text,
        {
          variants: {
            pastDue: {
              color: 'red',
            },
          },
        },
      ],
    ]}
  >
    <Table
      columns={[
        {
          header: 'Name',
          cell: (data) => `${data.firstName} ${data.lastName}`,
          cellVariants: (data) => ({
            pastDue: data.pastDue,
          }),
          width: 'max-content',
        },
        {
          header: 'Age',
          cell: 'age',
        },
        {
          header: 'Username',
          cell: 'username',
        },
        {
          header: 'Occupation',
          cell: 'occupation',
          width: '1fr',
        },
      ]}
      data={data}
      spacing="32px"
    />
  </Overrides>
)

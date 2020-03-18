import * as React from 'react'

export type PluginProps = {
  axis?: 'horizontal' | 'vertical'
  alignment?: 'start' | 'end' | 'center'
  distribution?: 'start' | 'end' | 'center'
}

export function plugin({ axis = 'horizontal' }: PluginProps) {
  return {
    flexDirection: axis === 'horizontal' ? 'row' : 'column',
  }
}

export type StackProps = React.RefAttributes<any> &
  React.HTMLAttributes<any> &
  PluginProps & {
    children?: React.ReactNode
  }

export function Stack({ children, ...props }: StackProps) {
  return <div {...props}>{children}</div>
}

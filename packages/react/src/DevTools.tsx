import * as React from 'react'

import { Overrides, OverridesProps } from './Overrides'
import { Spacer } from './Spacer'
import { Stack } from './Stack'
import { Text } from './Text'
import { Variants } from './Variants'

const overrides: OverridesProps['value'] = [
  [
    Spacer,
    {
      variants: {
        xray: {
          background: 'white',
        },
      },
    },
  ],
  [
    Text,
    {
      variants: {
        xray: {
          color: 'black',
        },
      },
    },
  ],
  [
    Stack,
    {
      variants: {
        xray: {
          strokeWeight: 1,
          strokeColor: 'black',
          background: 'white',
        },
      },
    },
  ],
  [
    'path',
    {
      variants: {
        xray: {
          fill: 'url(#diagonalHatch)',
          stroke: 'black',
          strokeWidth: 1,
        },
      },
    },
  ],
]

function Editor({ children }) {
  const [editorMode, setEditorMode] = React.useState(false)
  const [editorActiveElement, setEditorActiveElement] = React.useState(null)
  const editorVariant = (props) => ({
    ...props,
    onMouseOver: (event) => {
      event.stopPropagation()
      setEditorActiveElement(props.__uuid)
    },
    onMouseOut: () => {
      setEditorActiveElement(null)
    },
    onClick: (event) => {
      event.preventDefault()
      event.stopPropagation()
      setEditorActiveElement(props.__uuid)
    },
  })
  const editorActiveVariant = (props, state) => {
    const active = state === props.__uuid
    return active
      ? {
          ...props,
          style: {
            ...props.style,
            outline: `3px solid blue`,
            zIndex: 100,
          },
        }
      : props
  }
  React.useEffect(() => {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'e':
          setEditorMode((bool) => !bool)
          break
        case 'Escape':
          setEditorActiveElement(null)
          break
      }
    })
  }, [])
  React.useEffect(() => {
    if (editorMode === false) {
      setEditorActiveElement(null)
    }
  }, [editorMode])
  return (
    <Variants value={{ editorMode, editorActiveElement }}>
      <Overrides
        value={[
          [
            Stack,
            {
              variants: {
                editorMode: editorVariant,
                editorActiveElement: editorActiveVariant,
              },
            },
          ],
          [
            Text,
            {
              variants: {
                editorMode: (props) => {
                  return {
                    contentEditable: true,
                    suppressContentEditableWarning: true,
                    ...editorVariant(props),
                  }
                },
                editorActiveElement: editorActiveVariant,
              },
            },
          ],
        ]}
      >
        {children}
      </Overrides>
    </Variants>
  )
}

function ViewSize({ children }) {
  const [hoveredElement, setHoveredElement] = React.useState(false)
  const [altDown, setAltDown] = React.useState(false)
  React.useEffect(() => {
    function handleKeyDown(event) {
      setAltDown(event.key === 'Alt')
    }
    function handleKeyUp() {
      setAltDown(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  return (
    <Variants value={{ hoveredElement }}>
      <Overrides
        value={[
          [
            Spacer,
            (props) => ({
              children: ({ size, isMainAxisHorizontal }) => {
                const hover = hoveredElement === props.__uuid
                const isFractional =
                  typeof size === 'string' && size.includes('fr')
                return (
                  <div
                    onMouseEnter={() => setHoveredElement(props.__uuid)}
                    onMouseLeave={() => setHoveredElement(null)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    {altDown && hover && (
                      <svg
                        width={
                          isMainAxisHorizontal ? '100%' : isFractional ? 8 : 1
                        }
                        height={
                          isMainAxisHorizontal ? (isFractional ? 8 : 1) : '100%'
                        }
                        style={{
                          position: 'absolute',
                          [isMainAxisHorizontal
                            ? 'top'
                            : 'left']: `calc(50% - ${
                            isFractional ? 4 : 0.5
                          }px)`,
                          zIndex: 100,
                        }}
                      >
                        {isFractional ? (
                          <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${
                              isMainAxisHorizontal ? 'horizontal' : 'vertical'
                            }Wave)`}
                          />
                        ) : (
                          <rect width="100%" height="100%" fill="hotpink" />
                        )}
                      </svg>
                    )}
                    {altDown && hover && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          zIndex: 100,
                          backgroundColor: isMainAxisHorizontal
                            ? 'hsla(214, 72%, 56%, 0.5)'
                            : 'hsla(214, 84%, 74%, 0.5)',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'hotpink',
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: 0.8,
                            padding: '2px 4px',
                            whiteSpace: 'nowrap',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: 'default',
                          }}
                        >
                          {size}
                        </span>
                      </div>
                    )}
                  </div>
                )
              },
            }),
          ],
        ]}
      >
        {children}
      </Overrides>
    </Variants>
  )
}

export function DevTools({ children }) {
  const [xray, setXray] = React.useState(false)
  React.useEffect(() => {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'Escape':
        case 'x':
          setXray((bool) => !bool)
          break
      }
    })
  }, [])
  return (
    <Overrides value={overrides}>
      <Editor>
        <ViewSize>
          <Variants value={{ xray }}>{children}</Variants>
        </ViewSize>
      </Editor>
      <svg width="0" height="0" style={{ display: 'block' }}>
        <defs>
          <pattern
            id="horizontalWave"
            width="8"
            height="8"
            y="2"
            patternUnits="userSpaceOnUse"
          >
            <polyline
              points="0,0 4,4 8,0"
              fill="none"
              stroke="hotpink"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="verticalWave"
            width="8"
            height="8"
            x="2"
            patternUnits="userSpaceOnUse"
          >
            <polyline
              points="0,0 4,4 0,8"
              fill="none"
              stroke="hotpink"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="diagonalHatch"
            width="6"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              style={{ stroke: 'black', strokeWidth: 2 }}
            />
          </pattern>
        </defs>
      </svg>
    </Overrides>
  )
}

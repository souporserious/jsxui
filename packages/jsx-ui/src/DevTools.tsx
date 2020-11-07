import * as React from 'react'

import { Overrides, OverridesProps } from './Overrides'
import { Spacer } from './Spacer'

const overrides: OverridesProps['value'] = [
  [
    Spacer,
    {
      children: ({ size, mainAxis }) => {
        const [hover, setHover] = React.useState(false)
        const [altDown, setAltDown] = React.useState(false)
        const isFractional = typeof size === 'string' && size.includes('fr')
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
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
                  mainAxis === 'horizontal' ? '100%' : isFractional ? 8 : 1
                }
                height={
                  mainAxis === 'horizontal' ? (isFractional ? 8 : 1) : '100%'
                }
                style={{
                  position: 'absolute',
                  [mainAxis === 'horizontal' ? 'top' : 'left']: `calc(50% - ${
                    isFractional ? 4 : 0.5
                  }px)`,
                  zIndex: 100,
                }}
              >
                <defs>
                  <pattern
                    id="horizontal"
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
                    id="vertical"
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
                </defs>
                {isFractional ? (
                  <rect width="100%" height="100%" fill={`url(#${mainAxis})`} />
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
                  backgroundColor:
                    mainAxis === 'horizontal'
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
    },
  ],
]

export function DevTools({ children }) {
  return <Overrides value={overrides}>{children}</Overrides>
}

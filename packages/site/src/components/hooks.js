import * as React from 'react'

export function useMatches(queries) {
  const [matches, setMatches] = React.useState({})
  React.useLayoutEffect(() => {
    const updateMatches = () => {
      setMatches(
        Object.keys(queryLists).reduce((matches, key) => {
          const queryList = queryLists[key]
          return { ...matches, [key]: queryList.matches }
        }, {})
      )
    }
    const queryLists = Object.keys(queries).reduce((queryLists, key) => {
      const queryList = window.matchMedia(queries[key])
      queryList.addListener(updateMatches)
      queryLists[key] = queryList
      return queryLists
    }, {})
    updateMatches()
    return () => {
      Object.keys(queryLists).forEach((key) =>
        queryLists[key].removeListener(updateMatches)
      )
    }
  }, [])
  return matches
}

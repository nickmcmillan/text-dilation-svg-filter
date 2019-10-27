import { useState, useCallback, useLayoutEffect } from 'react'

function useDimensions() {
  const [dimensions, setDimensions] = useState({})
  const [node, setNode] = useState(null)

  const ref = useCallback(node => {
    setNode(node)
  }, [])

  useLayoutEffect(() => {
    if (node) {

      function handleResize() {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current)
        }

        timeoutId.current = setTimeout(function () {
          setDimensions(node.getBoundingClientRect())
        })
      }

      setDimensions(node.getBoundingClientRect())

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', measure)
      }
    }
  }, [node])

  return [ref, dimensions, node]
}

export default useDimensions

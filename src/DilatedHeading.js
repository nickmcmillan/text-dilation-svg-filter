import React, { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
// import useMeasure from 'react-use-measure'
// import mergeRefs from 'react-merge-refs'
import useDimensions from './useDimensions'

import calcStroke from './calcStroke'
import calculateLines from './calculateLines'
import calculateWordWidths from './calculateWordWidths'
import useEventListener from './useEventListener'


const config = { mass: 5, tension: 510, friction: 73 }
const lineHeight = 1.5

function DilatedHeading({
  // style = {},
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
}) {

  const [lineData, setLineData] = useState([])

  const [ref, getBoundingClientRect, refNode] = useDimensions()
  const { width, height, top, left } = getBoundingClientRect
  // console.log(bounds)


  useLayoutEffect(() => {
    if (!refNode) return


    const { fontSize, fontFamily } = window.getComputedStyle(refNode)
    const computedStyle = { fontSize, fontFamily }
    
    const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(textValue, computedStyle)
    
    const wordsByLines = calculateLines(wordsWithComputedWidth, spaceWidth, width)
    const wordLineData = wordsByLines.map(line => {
      return {
        lines: line.words.join(' '),
        width: line.width,
      }
    })

    setLineData(wordLineData)
  }, [getBoundingClientRect, width, refNode])

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    // if (!refNode) return // not ready yet
    const innerX = x - left
    const innerY = y - top
    set({ xy: [innerX, innerY] })
  }, [width, refNode])

  const [{ xy }, set] = useSpring(() => ({
    // from
    xy: [10, 300],
    config,
  }))

  useEventListener('mousemove', onMouseMove)

  return (
    <div className="outer">
      <svg
        ref={ref}
        className="DilatedHeading_svg"
      >
        <text
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="optimizeSpeed"
          width={width}
          // style={style}
        >
          {/* without empty tspans it gets super glitchy around the edges */}
          {/* so tspans are added above/below, as well as left/right of the text */}
          <tspan dy={`${-1 * lineHeight}em`}>&nbsp;</tspan>

          {lineData.length && lineData.map((lineDataItem, lineNumber) => {

            const characters = lineDataItem.lines.split('')

            return (
              <tspan x={10} y={50} dy={`${lineNumber * lineHeight}em`} key={`${lineDataItem.lines}-${lineNumber}`}>

                <tspan>&nbsp;</tspan>

                {characters.map((char, characterIndex) => (
                  <animated.tspan
                    key={`${lineDataItem.lines}-${characterIndex}-${char}`}
                    strokeWidth={xy.interpolate((x, y) => {
                      const lineWidth = lineDataItem.width
                      const componentHeight = height

                      return calcStroke({
                        x, y,
                        characterIndex,
                        spread,
                        maxFat,
                        lineWidth,
                        componentHeight,
                        lineNumber,
                        characters,
                      })
                    })}
                  >
                    {char}
                  </animated.tspan>
                ))}

                <tspan>&nbsp;</tspan>

              </tspan>
            )
          })}

          <tspan x={10} y={50} dy={`${lineData.length + 1 * lineHeight}em`}>&nbsp;</tspan>
        </text>

      </svg>
    </div>
  )
}

export default DilatedHeading
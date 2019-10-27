import React, { useCallback, useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useDimensions from './useDimensions'
import calcStroke from './calcStroke'
import calculateLines from './calculateLines'
import calculateWordWidths from './calculateWordWidths'
import useEventListener from './useEventListener'

const config = { mass: 5, tension: 510, friction: 73 }
const lineHeight = 1.5

function DilatedHeading({
  style = {},
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
}) {

  const [ref, getBoundingClientRect, refNode] = useDimensions()
  const { width, height, top, left } = getBoundingClientRect

  const [lineData, setLineData] = useState([])

  useEffect(() => {
    if (!width) return
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
    if (!width) return // not ready yet
    const innerX = x - left
    const innerY = y - top
    set({ xy: [innerX, innerY] })
  }, [getBoundingClientRect])

  const [{ xy }, set] = useSpring(() => ({
    // from
    xy: [10, 300],
    config,
  }))

  useEventListener('mousemove', onMouseMove)

  return (
    <div className="DilatedHeading">
      <svg
        ref={ref}
        className="DilatedHeading_svg"
        // width={width}
        // height={400}
      >
        <text
          dy={`0.71em`}
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          // shapeRendering="geometricprecision"
          width={width}
          style={style}
        >
          <tspan x={10} y={50} dy={`${-1 * lineHeight}em`}>&nbsp;</tspan>

          {lineData.map((lineDataItem, i) => {

            const characters = lineDataItem.lines.split('')
            const widths = lineDataItem

            return (
              <tspan x={10} y={50} dy={`${i * lineHeight}em`} key={`${lineDataItem.lines}-${i}`}>
                
                <tspan>&nbsp;</tspan>

                {characters.map((char, ii) => {
                  return (
                    <animated.tspan
                      key={char + ii}
                      // stroke="#fff"
                      // stroke={headingWidth > 0 ? '#000' : '#fff'}
                      strokeWidth={xy.interpolate((x, y) => {
                        const lineWidth = lineDataItem.width
                        const lineCount = i
                        const componentHeight = height

                        return calcStroke({
                          x, y,
                          ii,
                          spread,
                          maxFat,
                          lineWidth,
                          componentHeight,
                          lineCount,
                          characters,
                        })
                      })}
                    >
                      {char}
                    </animated.tspan>
                  )
                })}

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
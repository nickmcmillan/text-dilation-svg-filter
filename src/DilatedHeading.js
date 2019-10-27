import React, { useRef, useCallback, useLayoutEffect, useMemo, useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useDimensions from './useDimensions'
import calcStroke from "./calcStroke"
import calculateLines from "./calculateLines"
import calculateWordWidths from "./calculateWordWidths"
import useEventListener from "./useEventListener"

const config = { mass: 5, tension: 510, friction: 73 }

function DilatedHeading({
  style,
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
}) {

  const [lineData, setLineData] = useState([])
  const [ref, getBoundingClientRect] = useDimensions()

  const { width, height, top, left } = getBoundingClientRect

  const lineHeight = 1.5

  useEffect(() => {
    const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(textValue, style)
    const wordsByLines = calculateLines(wordsWithComputedWidth, spaceWidth, width)
    const wordLineData = wordsByLines.map(line => {
      return {
        lines: line.words.join(' '),
        width: line.width,
      }
    })
    setLineData(wordLineData)
  }, [getBoundingClientRect])

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    if (!lineData.length) return // not ready yet
    const innerX = x - left
    const innerY = y - top
    set({ xy: [innerX, innerY] })
  }, [width, height, top, left])

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
        width={width}
        height={400}
      >
        <text
          dy={`0.71em`}
          x="10"
          y="50"
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="geometricprecision"
          width={width}
          style={style}
        >
          {lineData.map((lineDataItem, i) => {

            const characters = lineDataItem.lines.split('')

            return (
              <tspan x={10} y={50} dy={`${i * lineHeight}em`} key={`${lineDataItem.lines}-${i}`}>

                {characters.map((char, ii) => {
                  return (
                    <animated.tspan
                      key={char + ii}
                      stroke="#fff"
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
              </tspan>
            )
          })}
        </text>

      </svg>

      {/* <svg
        className="DilatedHeading_svg"
        // viewBox={`0 0 ${window.innerWidth} 0.01`}
        // viewBox="-20 0 800 70"
        ref={ref}
      >
      
        <text
          className="heading_text"
          x="10"
          y="50"
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="geometricprecision"
        >
            {characters.map((char, i) => {
              return (
                <animated.tspan
                  
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  strokeWidth={xy.interpolate((x, y) => calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line: 0 }, characters))}
                >
                  {char}
                </animated.tspan>
              )
            })}
        </text>
        
        <text
          className="heading_text"
          x="10"
          y="100"
        >
            {characters2.map((char, i) => {
              return (
                <animated.tspan
                  shapeRendering="geometricprecision"
                  strokeLinejoin="round"
                  fill={textColor}
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke={textColor}
                  strokeWidth={xy.interpolate((x, y) => calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line: 1}, characters2))}
                >
                  {char}
                </animated.tspan>
              )
            })}
        </text>
        <text
          className="heading_text"
          x="10"
          y="150"
        >
            {characters3.map((char, i) => {
              return (
                <animated.tspan
                  shapeRendering="geometricprecision"
                  strokeLinejoin="round"
                  fill={textColor}
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke={textColor}
                  strokeWidth={xy.interpolate((x, y) => calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line: 2}, characters3))}
                >
                  {char}
                </animated.tspan>
              )
            })}
        </text>
        
        <text
          className="heading_text"
          x="10"
          y="200"
        >
            {characters4.map((char, i) => {
              return (
                <animated.tspan
                  shapeRendering="geometricprecision"
                  strokeLinejoin="round"
                  fill={textColor}
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke={textColor}
                  strokeWidth={xy.interpolate((x, y) => calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line: 2.5}, characters4))}
                >
                  {char}
                </animated.tspan>
              )
            })}
        </text>

      </svg> */}
    </div>
  )
}

export default DilatedHeading
import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useResizeObserver from "use-resize-observer"

import useDimensions from './useDimensions'
import calcStroke from "./calcStroke"
import calculateLines from "./calculateLines"
import calculateWordWidths from "./calculateWordWidths"



const config = { mass: 5, tension: 510, friction: 73 }

function DilatedHeading({
  innerText,
  innerText2,
  innerText3,
  innerText4,
  containerWidth,
  style,
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
}) {
  const [lines, setLines] = useState([])

  const characters = textValue.split('')
  const lineHeight = 1.5

  const [ref, width, height] = useResizeObserver()

  useMemo(() => {
    const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(textValue, style)
    const lines = calculateLines(wordsWithComputedWidth, spaceWidth, containerWidth)
    console.log(containerWidth)
    
    setLines(lines)
  }, [width, height, textValue, style])


  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const innerX = x - width
    const innerY = y - height

    set({ xy: [innerX, innerY] })
  }, [width, height, characters])

  const [{ xy }, set] = useSpring(() => ({
    // from
    xy: [10, 300],
    config,
  }))

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)

    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [onMouseMove, width, height])

  return (
    <div className="DilatedHeading">

      <svg
        ref={ref}
        className="DilatedHeading_svg"
        width={containerWidth}
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
          width={containerWidth}
          style={style}
        >
          {lines.map((line, i) => {

            const charos = line.split('')

            return (
              <tspan x={10} y={50} dy={`${i * lineHeight}em`} key={`${line}-${i}`}>
                {line}

                {/* {charos.map((char, i) => {
                  return (
                    <animated.tspan
                      key={char + i}
                      // stroke={headingWidth > 0 ? '#000' : '#fff'}
                      strokeWidth={xy.interpolate((x, y) => {
                        calcStroke({ x, y, i, spread, maxFat, width, height, line: 0 }, characters)
                      })}
                    >
                      {char}
                    </animated.tspan>
                  )
                })} */}
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
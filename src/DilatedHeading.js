import React, { useCallback, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
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
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
}) {

  const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(textValue, {});
  const lines = calculateLines(wordsWithComputedWidth, spaceWidth, 250);

  const lineHeight = 1.5

  const characters = innerText.split('')
  const characters2 = innerText2.split('')
  const characters3 = innerText3.split('')
  const characters4 = innerText4.split('')

  const [textRef, getBoundingClientRect] = useDimensions()


  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const innerX = x - getBoundingClientRect.x
    const innerY = y - getBoundingClientRect.y
    set({ xy: [innerX, innerY] })
  }, [getBoundingClientRect, set, characters])


  const [{ xy }, set] = useSpring(() => ({
    // from
    xy: [10, 300],
    config,
  }))

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)

    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [getBoundingClientRect])

  return (
    <div className="DilatedHeading">

      <svg
        className="DilatedHeading_svg"
      >
        <text
          dy={`0.71em`}
          className="heading_text"
          x="10"
          y="50"
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="geometricprecision"
          style={{
            width: window.innerWidth
          }}
        >
          {lines.map((word, index) => (
            <tspan x={10} y={50} dy={`${index * lineHeight}em`} key={`${word}-${index}`}>
              {word}
            </tspan>
          ))}
        </text>
        {/* <Text
          width={250}
          className="heading_text"
          x="10"
          y="50"
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="geometricprecision"
        >
          We embrace the freedom to be creative, we encourage our employees to think differently, to think critically and to solve a problem in a new way.
        </Text> */}

      </svg>

      <svg
        className="DilatedHeading_svg"
        // viewBox={`0 0 ${window.innerWidth} 0.01`}
        // viewBox="-20 0 800 70"
        ref={textRef}
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

      </svg>
    </div>
  )
}

export default DilatedHeading
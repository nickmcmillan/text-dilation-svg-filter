import React, { useCallback, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useDimensions from './useDimensions'
// import useMousePosition from "./useMousePosition"

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const distanceXY = (mouseX, mouseY, startingLeft, startingTop) => {
  return Math.sqrt(Math.pow(startingTop - mouseY, 2 ) + Math.pow(startingLeft - mouseX, 2)) || 0
}

// const distanceX = (mouseX, startingLeft) => {
//   return Math.pow(startingLeft - mouseX, 2)
// }

const config = { mass: 5, tension: 510, friction: 73 }

function calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line }, characters) {
  // console.log(y)

  const { width, height, top } = getBoundingClientRect
  // console.log(y, top)
  
  const mappedX = map_range(x, 0, width, 0, characters.length)
  const mappedY = map_range(y, 0, height, 0, 20)
  
  const fromMouse = distanceXY(mappedX, mappedY, i, line * 10)
  // console.log(fromMouse)
  
  // const fromMouse = distanceX(x, i)
  const mapMouse = map_range(fromMouse, 0, spread, maxFat, 0)
  const clamp = Math.min(Math.max(0, mapMouse), maxFat)
  const rounded = Math.round(clamp * 100 + Number.EPSILON) / 100
  return rounded
}

function DilatedHeading({ innerText, innerText2, innerText3, spread = 8, maxFat = 20, textColor = '#000' }) {

  const characters = innerText.split('')
  const characters2 = innerText2.split('')
  const characters3 = innerText3.split('')

  const [textRef, getBoundingClientRect] = useDimensions()

  const [{ xy }, set] = useSpring(() => ({
    // from
    xy: [10, 300],
    config,
  }))

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const innerX = x - getBoundingClientRect.x
    const innerY = y - getBoundingClientRect.y
    set({ xy: [innerX, innerY] })
  }, [getBoundingClientRect, set, characters])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)

    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [getBoundingClientRect])

  return (
    <div className="DilatedHeading" >

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
        >
            {characters.map((char, i) => {
              return (
                <animated.tspan
                  shapeRendering="geometricprecision"
                  strokeLinejoin="round"
                  fill={textColor}
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke={textColor}
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

      </svg>
    </div>
  )
}

export default DilatedHeading
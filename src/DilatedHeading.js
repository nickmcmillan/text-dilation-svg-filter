import React, { useCallback, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useDimensions from './useDimensions'
// import useMousePosition from "./useMousePosition"

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const distanceXY = (mouseX, mouseY, startingLeft, startingTop) => {
  return Math.sqrt(Math.abs(startingTop - mouseY ) + Math.pow(startingLeft - mouseX, 2)) || 0
}

// const distanceX = (mouseX, startingLeft) => {
//   return Math.pow(startingLeft - mouseX, 2)
// }

const config = { mass: 5, tension: 510, friction: 73 }

function DilatedHeading({ innerText, innerText2, spread = 8, maxFat = 20 }) {

  const characters = innerText.split('')
  const characters2 = innerText2.split('')

  const [textRef, getBoundingClientRect] = useDimensions()

  const [{ xy }, set] = useSpring(() => ({ xy: [10, 300], config }))

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const innerX = x - getBoundingClientRect.x
    const innerY = y - getBoundingClientRect.y
    const mappedX = map_range(innerX, 0, getBoundingClientRect.width, 0, characters.length)
    const mappedY = map_range(innerY, 0, getBoundingClientRect.height, 0, characters.length)

    set({ xy: [mappedX, mappedY] })

  }, [getBoundingClientRect, set, characters])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)

    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [getBoundingClientRect])

  return (
    <div className="DilatedHeading" >

      <svg
        // onMouseMove={onMouseMove}
        className="DilatedHeading_svg"
        // viewBox={`0 0 ${window.innerWidth} 0.01`}
        viewBox="-20 0 800 70"
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
                  fill="#000"
                  key={char + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke='#000'
                  strokeWidth={xy.interpolate((x, y) => {

                    const fromMouse = distanceXY(x, y, i, 0)
                    // const fromMouse = distanceX(x, i)
                    const mapMouse = map_range(fromMouse, 0, spread, maxFat, 0)
                    const clamp = Math.min(Math.max(0, mapMouse), maxFat)
                    const rounded = Math.round(clamp * 100 + Number.EPSILON) / 100
                    return rounded

                  })}
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
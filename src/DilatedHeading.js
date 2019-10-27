import React, { useCallback, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import useDimensions from './useDimensions'
// import useMousePosition from "./useMousePosition"

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function DilatedHeading({
  style,
  spread = 8,
  maxFat = 20,
  textColor = '#000',
  textValue,
  unloadedWidth = 500
}) {

  const [lineData, setLineData] = useState([])
  const [ref, getBoundingClientRect] = useDimensions()
  const { width, height, top, left } = getBoundingClientRect

function calcStroke({ x, y, i, spread, maxFat, getBoundingClientRect, line }, characters) {
  // console.log(y)

  const { width, height, top } = getBoundingClientRect
  // console.log(y, top)
  
  const mappedX = map_range(x, 0, width, 0, characters.length)
  const mappedY = map_range(y, 0, height, 0, 28)
  
  const fromMouse = distanceXY(mappedX, mappedY, i, line * 10)
  // console.log(fromMouse)
  
  // const fromMouse = distanceX(x, i)
  const mapMouse = map_range(fromMouse, 0, spread, maxFat, 0)
  const clamp = Math.min(Math.max(0, mapMouse), maxFat)
  const rounded = Math.round(clamp * 100 + Number.EPSILON) / 100
  return rounded
}

  useEffect(() => {
    const { wordsWithComputedWidth, spaceWidth } = calculateWordWidths(textValue, style)
    const wordsByLines = calculateLines(wordsWithComputedWidth, spaceWidth, width || unloadedWidth)
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
  }, [getBoundingClientRect])

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
        // width={width}
        // height={height}
      >
      
        <text
          className="heading_text"
          x="10"
          y="50"
          strokeLinejoin="round"
          fill={textColor}
          stroke={textColor}
          shapeRendering="geometricprecision"
          // width={width}
          style={style}
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
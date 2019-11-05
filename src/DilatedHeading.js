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
        <defs>
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width="900"
            height="700"
            viewBox="0 0 900 700"
          >
            <image xlinkHref="https://picsum.photos/id/6/900/700" width="900" height="700" />
          </pattern>
        </defs>

        
        {/* <clipPath id="clipPath"> */}

          
          <text
            dy={`0.71em`}
            dx="-1em"
            strokeLinejoin="round"
            fill={textColor}
            // fill="url(#pattern)"
            // stroke={textColor}
            // shapeRendering="geometricPrecision"
            shapeRendering="optimizeSpeed"
            width={width}
            style={style}
            stroke="url(#pattern)"
          >
            <tspan x={0} y={50} dy={`${-1 * lineHeight}em`}>&nbsp;</tspan>

            {lineData.map((lineDataItem, lineNumber) => {

              const characters = lineDataItem.lines.split('')

              return (
                <tspan x={10} y={50} dy={`${lineNumber * lineHeight}em`} key={lineDataItem.lines}>
                  
                  <tspan>&nbsp;</tspan>

                  {characters.map((char, characterIndex) => (
                    <animated.tspan
                      key={`${lineDataItem.lines}-${characterIndex}-${char}`}
                      // stroke="#fff"
                      // stroke={headingWidth > 0 ? '#000' : '#fff'}
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
                  <tspan>&nbsp;</tspan>

                </tspan>
              )
            })}

            <tspan x={10} y={50} dy={`${lineData.length + 1 * lineHeight}em`}>&nbsp;</tspan>
          </text>
        {/* </clipPath> */}

      </svg>

      {/* <img src="https://picsum.photos/id/6/900/700" alt="" className="img" /> */}

    </div>
  )
}

export default DilatedHeading
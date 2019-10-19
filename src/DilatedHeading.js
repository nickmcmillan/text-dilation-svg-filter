import React, { useRef, useState } from 'react'
import { useTrail, useChain, useSpring, animated } from 'react-spring'
import useBoundingclientrect from "@rooks/use-boundingclientrect"
import useMousePosition from "./useMousePosition"

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const maxFat = 5
const spread = 15

const distanceXY = (mouseX, mouseY, startingLeft, startingTop) => {
  return Math.round(Math.sqrt(Math.pow(startingTop - mouseY, 2) + Math.pow(startingLeft - mouseX, 2)))
}

const distanceX = (mouseX, startingLeft) => {
  return Math.pow(startingLeft - mouseX, 2)
}

const config = { mass: 12, tension: 410, friction: 103 }
const calc = (x, y) => [x, y]

function Heading({innerText}) {
  const [headingWidth, setHeadingWidth] = useState(0)

  const items = innerText.split('')

  const textRef = useRef()
  const getBoundingClientRect = useBoundingclientrect(textRef)
  // const { x, y } = useMousePosition(getBoundingClientRect);
  // console.log({x, y})

  // console.log(x)
  
  

  const [props, set] = useSpring(() => ({
    xy: [0, 0,],
    // x: 0,
    // y: 0,
    config
  }))


  // const springRef = useRef()
  // const trailRef = useRef()

  // const { opacity } = useSpring({
  //   ref: springRef,
  //   opacity: 1,
  //   from: { opacity: 0 },
  // })

  // const trail = useTrail(items.length, {
  //   ref: trailRef,
  //   x: 0,
  //   from: { x: 40 },
  //   config,
  // })

  // useChain([trailRef, springRef], [0.25, 1])


  return (
    <>
    <div className="App">


        <svg
          // height="200" width="00"
          // viewBox="0 0 240 80" 
          
          onMouseMove={({ clientX: x, clientY: y }) => {
            // const inWidth = x >= getBoundingClientRect.x && x < getBoundingClientRect.width + getBoundingClientRect.x
            // const inHeight = y >= getBoundingClientRect.y && y < getBoundingClientRect.height + getBoundingClientRect.y

            // console.log(x, y)



            // if (inWidth && inHeight) {
            const innerX = x - getBoundingClientRect.x
            const innerY = y - getBoundingClientRect.y

            const mappedX = map_range(innerX, 0, getBoundingClientRect.width, 0, items.length)
            const mappedY = map_range(innerY, 0, getBoundingClientRect.height, 0, items.length)

            // console.log(mappedX, mappedY)




            // setMousePosition({ x: innerX, y: innerY });
            // }

            set({ xy: [mappedX, mappedY] })
          }}
        >
        
        <text
            className="heading_text"
          // id="heading_text"
          x="10"
          y="50"
          // shapeRendering="optimizeSpeed"
          ref={textRef}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#000"
          textAnchor="start"
          
        >
            {items.map((word, i) => {
              return (
                <animated.tspan
                  key={word + i}
                  // stroke={headingWidth > 0 ? '#000' : '#fff'}
                  stroke='#000'
                  // strokeWidth={Math.abs(headingWidth)}
                  strokeWidth={props.xy.interpolate((x, y) => {

                    // const fromMouse = distanceXY(x, y, i, 10)
                    const fromMouse = distanceX(x, i)
                    const mapMouse = map_range(fromMouse, 0, spread, maxFat, 0)
                    const clamp = Math.min(Math.max(0, mapMouse), maxFat)
                    const rounded = Math.round(clamp * 100 + Number.EPSILON) / 100
                    return rounded

                  })}
                >
                  {word}
                </animated.tspan>
              )
            })}

        </text>

      </svg>
    </div>
    </>
  )
}

export default Heading
import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import useBoundingclientrect from "@rooks/use-boundingclientrect"


const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`

// var startingTop = 10,
//   startingLeft = 22,

const distance = (mouseX, mouseY, startingLeft, startingTop) => {
  return Math.round(Math.sqrt(Math.pow(startingTop - mouseY, 2) + Math.pow(startingLeft - mouseX, 2)))
}

function BigLogo() {

  const refM = useRef()
  const getBoundingClientRectM = useBoundingclientrect(refM)

  const [bigLogoWidth, setBigLogoWidth] = useState(0)
  const [props, set] = useSpring(() => ({ xy: [0, 0], 
    // config: { mass: 10, tension: 550, friction: 140 }
  }))

  console.log(getBoundingClientRectM)

  return (
    <>

      <div className="svg-container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="mass_big_logo"
        >

          <animated.text
            ref={refM}
            xlinkHref="#letter_m"
            id="letter_m"
            x="0"
            y="20rem"
            stroke={bigLogoWidth > 0 ? '#000' : '#fff'}
            strokeWidth={props.xy.interpolate((x, y) => {
              // console.log({x, y})
              

              if (getBoundingClientRectM) {
                const mouseDistance = distance(x, y, getBoundingClientRectM.x, getBoundingClientRectM.y)
                // console.log(mouseDistance)
                
                
                return mouseDistance

              } else {
                return 0
              }

              
              
            })}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#000"
          >
              M
          </animated.text>

        </svg>
      </div>

      <div className="App">

        <input
          type="range"
          min={-50}
          max={800}
          value={bigLogoWidth}
          step="0.01"
          onChange={e => setBigLogoWidth(e.target.value)}
        />
        <p>
          {bigLogoWidth}
        </p>
      </div>
    </>
  )
}

export default BigLogo
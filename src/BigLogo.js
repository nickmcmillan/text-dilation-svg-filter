import React, { useState } from 'react'

function BigLogo() {
  const [bigLogoWidth, setBigLogoWidth] = useState(0)

  return (
    <>
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

      <div className="svg-container">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          className="mass_big_logo"
        >

          <clipPath>
            <text xlinkHref="#mass_big_logo" id="mass_big_logo">
              <tspan x="0" dy="1.2em">M A</tspan>
              <tspan x="0" dy="1.2em">S S</tspan>
            </text>
          </clipPath>

          <use
            xlinkHref="#mass_big_logo"
            stroke={bigLogoWidth > 0 ? '#000' : '#fff'}
            strokeWidth={Math.abs(bigLogoWidth)}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#000"
            shapeRendering="optimizeSpeed"
          />

          {bigLogoWidth > 0 &&
            <use
              xlinkHref="#mass_big_logo"
              stroke='#000'
              strokeWidth={bigLogoWidth * 1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#000"
            />
          }

        </svg>
      </div>
    </>
  )
}

export default BigLogo
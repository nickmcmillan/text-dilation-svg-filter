// https://stackoverflow.com/a/32162431/2255980
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

function App() {
  const [bigLogoWidth, setBigLogoWidth] = useState(0)
  const [headingWidth, setHeadingWidth] = useState(0)

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
          style={{
            filter: bigLogoWidth < -15 ? 'blur(3px) contrast(10)' : null
          }}
        >
          <defs>
            <text id="mass_big_logo" y="-0.25em">
              <tspan x="0" dy="1.2em">M A</tspan>
              <tspan x="0" dy="1.2em">S S</tspan>
            </text>

            <clipPath id="mass_big_logo_clip">
              <use xlinkHref="#mass_big_logo" />
            </clipPath>
          </defs>

          <use
            xlinkHref="#mass_big_logo"
            stroke={bigLogoWidth > 0 ? '#000' : '#fff'}
            strokeWidth={Math.abs(bigLogoWidth)}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#000"
            shapeRendering="optimizeSpeed"
            clipPath={bigLogoWidth > 0 ? null : 'url(#mass_big_logo_clip)'}
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

      <div className="App">

        <input
          type="range"
          min={-5}
          max={40}
          value={headingWidth}
          step="0.001"
          onChange={e => setHeadingWidth(e.target.value)}
        />
        <p>
          {headingWidth}
        </p>

        <svg viewBox="0 0 1000 250" className="heading_text">
          <defs>
            <text id="heading_text" dx="0" dy="130" shapeRendering="optimizeSpeed">
              Could use this for headings
            </text>

            <clipPath id="heading_text_clip">
              <use xlinkHref="#heading_text" />
            </clipPath>
          </defs>

          <use
            x="0"
            y="0"
            xlinkHref="#heading_text"
            stroke={headingWidth > 0 ? '#000' : '#fff'}
            strokeWidth={Math.abs(headingWidth)}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#000"
            clipPath={headingWidth > 0 ? null : 'url(#heading_text_clip)'}
          />
        </svg>
      </div>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

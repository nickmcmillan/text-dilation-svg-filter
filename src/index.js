// https://stackoverflow.com/a/32162431/2255980
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import BigLogo from './BigLogo'
import DilatedHeading from './DilatedHeading'

import './styles.css'

function App() {
  const [containerWidth, setContainerWidth] = useState(690)

  return (
    <>
      <section className="dark">
        {/* <input type="range" min={10} max={1000} value={containerWidth} onChange={(e) => setContainerWidth(parseInt(e.target.value, 10))} /> */}

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas aliquid adipisci atque assumenda dolorum cum vel consectetur quasi. Soluta minus sint debitis ipsum excepturi magnam illo necessitatibus praesentium quod!</p>
        
        <DilatedHeading
          // className
          // textValue="We"
          textValue="We embrace the freedom to be creative, we encourage our employees to think differently, to think critically and to solve a problem in a new way."
          innerText="We embrace the freedom to be"
          innerText2="creative, we encourage our employees"
          innerText3="to think differently, to think critically"
          innerText4="and to solve a problem in a new way."
          spread={10}
          maxFat={20}
          textColor="#fff"
          containerWidth={containerWidth}
          style={{
            fontSize: '2rem',
            fontFamily: 'sg',
          }}
        />

       

      </section>
      
      <section className="light">

        {/* <DilatedHeading
          // className
          // make this an array
          innerText="We embrace the freedom to be"
          innerText2="creative, we encourage our employees"
          innerText3="to think differently, to think critically"
          innerText4="and to solve a problem in a new way."
          spread={10}
          maxFat={20}
          textColor="#000"
        /> */}
      </section>
      
        {/* <BigLogo /> */}
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

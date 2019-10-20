// https://stackoverflow.com/a/32162431/2255980
import React from 'react'
import ReactDOM from 'react-dom'

import BigLogo from './BigLogo'
import DilatedHeading from './DilatedHeading'

import './styles.css'

function App() {

  return (
    <>
      <section className="dark">

        <DilatedHeading
          // className
          // make this an array
          innerText="We embrace the freedom to be"
          innerText2="creative, we encourage our employees"
          innerText3="to think differently, to think critically"
          innerText4="and to solve a problem in a new way."
          spread={10}
          maxFat={20}
          textColor="#fff"
        />
      </section>
      
      <section className="light">

        <DilatedHeading
          // className
          // make this an array
          innerText="We embrace the freedom to be"
          innerText2="creative, we encourage our employees"
          innerText3="to think differently, to think critically"
          innerText4="and to solve a problem in a new way."
          spread={10}
          maxFat={20}
          textColor="#000"
        />
      </section>
      
        {/* <BigLogo /> */}
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

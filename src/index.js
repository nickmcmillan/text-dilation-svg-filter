// https://stackoverflow.com/a/32162431/2255980
import React from 'react'
import ReactDOM from 'react-dom'

import DilatedHeading from './DilatedHeading'

import './styles.css'

function App() {

  return (
    <>
      {/* <section className="dark">
        <DilatedHeading
          textValue="We embrace the freedom to be creative, we encourage our employees to think differently, to think critically and to solve a problem in a new way."
          spread={10}
          maxFat={20}
          textColor="#fff"
        />
      </section> */}
      
      <section className="light">
        <DilatedHeading
          textValue="We embrace the freedom to be creative, we encourage our employees to think differently, to think critically and to solve a problem in a new way."
          spread={8}
          maxFat={30}
          textColor="#000"
        />
      </section>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

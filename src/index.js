// https://stackoverflow.com/a/32162431/2255980
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import BigLogo from './BigLogo'
import DilatedHeading from './DilatedHeading'

import './styles.css'


function App() {
  
  

  return (
    <>
      <DilatedHeading
        innerText="This is some fancy chonky text"
      />

      
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

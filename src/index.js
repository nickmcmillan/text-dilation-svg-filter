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
          textValue="The Everything bagel was warm enough but I wouldn’t say it was hot. I would have liked a bit more bite. But it was incredibly fresh and gives a good sense of what the texture of a real untoasted New York bagel should be."
          spread={15}
          maxFat={10}
          textColor="#000"
        />
      </section>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

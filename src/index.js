// https://stackoverflow.com/a/32162431/2255980
import React from 'react'
import ReactDOM from 'react-dom'

import BigLogo from './BigLogo'
import DilatedHeading from './DilatedHeading'

import './styles.css'

function App() {

  return (
    <>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem voluptate deleniti unde recusandae! Tempore voluptatibus eveniet esse sequi quas, asperiores obcaecati, nihil quia perferendis nobis natus suscipit voluptatum magni dolore.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem voluptate deleniti unde recusandae! Tempore voluptatibus eveniet esse sequi quas, asperiores obcaecati, nihil quia perferendis nobis natus suscipit voluptatum magni dolore.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem voluptate deleniti unde recusandae! Tempore voluptatibus eveniet esse sequi quas, asperiores obcaecati, nihil quia perferendis nobis natus suscipit voluptatum magni dolore.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem voluptate deleniti unde recusandae! Tempore voluptatibus eveniet esse sequi quas, asperiores obcaecati, nihil quia perferendis nobis natus suscipit voluptatum magni dolore.</p>
      
      <DilatedHeading
        innerText="We embrace the freedom to be"
        innerText2="creative, we encourage our employees"
        innerText3="to think differently, to think critically"
        spread={7}
        maxFat={10}
        textColor="#fff"
      />
      {/* <DilatedHeading
        innerText="and perhaps another line"
        spread={6}
        maxFat={15}
      /> */}
      
        {/* <BigLogo /> */}
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

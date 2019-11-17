// https://codepen.io/techniq/pen/rLXwJJ
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

function calculateWordWidths(textString, computedStyle) {

  // Calculate length of each word to be used to determine number of words per line
  const words = textString.split(/\s+/)

  Object.assign(text.style, computedStyle)
  
  svg.appendChild(text)
  document.body.appendChild(svg)

  const wordsWithComputedWidth = words.map(word => {
    text.textContent = word
    return { word, width: text.getComputedTextLength() + 5 } // more space because we're adding extra &nbsp; tspans
  })
  
  text.textContent = '\u00A0' // Unicode space
  const spaceWidth = text.getComputedTextLength()

  document.body.removeChild(svg)

  return { wordsWithComputedWidth, spaceWidth }
}

export default calculateWordWidths

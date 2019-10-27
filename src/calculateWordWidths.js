// https://codepen.io/techniq/pen/rLXwJJ
function calculateWordWidths(children, style) {

  // Calculate length of each word to be used to determine number of words per line
  const words = children.split(/\s+/)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')

  Object.assign(text.style, style)
  
  svg.appendChild(text)
  document.body.appendChild(svg)

  const wordsWithComputedWidth = words.map(word => {
    text.textContent = word
    return { word, width: text.getComputedTextLength() + 1.5 }
  })
  
  text.textContent = '\u00A0' // Unicode space
  const spaceWidth = text.getComputedTextLength()

  document.body.removeChild(svg)

  return { wordsWithComputedWidth, spaceWidth }
}

export default calculateWordWidths

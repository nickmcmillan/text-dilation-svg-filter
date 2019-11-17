function calculateLines(wordsWithComputedWidth, spaceWidth, lineWidth) {
  const wordsByLines = wordsWithComputedWidth.reduce((result, { word, width }) => {
    const lastLine = result[result.length - 1] || { words: [], width: 0 }

    if (lastLine.words.length === 0) {
      // First word on line
      const newLine = { words: [word], width }
      result.push(newLine)
    } else if (lastLine.width + width + (lastLine.words.length * spaceWidth) < lineWidth) {
      // Word can be added to an existing line
      lastLine.words.push(word)
      lastLine.width += width
    } else {
      // Word too long to fit on existing line
      const newLine = { words: [word], width }
      result.push(newLine)
    }

    return result
  }, [])

  
  return wordsByLines
  // return wordsByLines.map(line => line.words.join(' '))
}

export default calculateLines

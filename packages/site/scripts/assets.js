const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const svgtojsx = require('svg-to-jsx')
const { pascalCase } = require('case-anything')
const { fetchImages } = require('figma-tools')
const prettier = require('prettier/standalone')
const parserBabel = require('prettier/parser-babel')

dotenv.config()

fetchImages({
  fileId: 'DhBGEHQ8HJNz1R1xltQwdE',
  format: 'svg',
}).then(async (svgs) => {
  const imports = `
    import React from 'react'
    import { Graphic } from '@jsxui/react'
  `
  const jsx = await Promise.all(svgs.map((svg) => svgtojsx(svg.buffer)))
  const data = svgs
    .map((svg, index) => {
      const jsxString = jsx[index]
        .replace(/(<svg [^>]*)>/, '$1 {...props}>')
        .replace(/<svg/g, '<Graphic')
        .replace(/<\/svg/g, '</Graphic')
      return `export const ${pascalCase(svg.name)} = (props) => ${jsxString}`
    })
    .join('\n')
  fs.writeFileSync(
    path.resolve('src/assets.js'),
    prettier.format(imports + data, {
      parser: 'babel',
      plugins: [parserBabel],
    })
  )
})

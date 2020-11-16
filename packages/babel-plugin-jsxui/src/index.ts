import * as t from '@babel/types'
import jsx from '@babel/plugin-syntax-jsx'

// adapted from: https://github.com/babel/babel/blob/main/packages/babel-helper-builder-react-jsx/src/index.js

function convertAttributeValue(node) {
  if (t.isJSXExpressionContainer(node)) {
    return node.expression
  } else {
    return node
  }
}

function convertAttribute(node) {
  const value = convertAttributeValue(node.value || t.booleanLiteral(true))

  if (t.isJSXSpreadAttribute(node)) {
    return t.spreadElement(node.argument)
  }

  if (t.isStringLiteral(value) && !t.isJSXExpressionContainer(node.value)) {
    value.value = value.value.replace(/\n\s+/g, ' ')

    // "raw" JSXText should not be used from a StringLiteral because it needs to be escaped.
    delete value.extra?.raw
  }

  if (t.isJSXNamespacedName(node.name)) {
    node.name = t.stringLiteral(
      node.name.namespace.name + ':' + node.name.name.name
    )
  } else if (t.isValidIdentifier(node.name.name)) {
    node.name.type = 'Identifier'
  } else {
    node.name = t.stringLiteral(node.name.name)
  }

  return t.inherits(t.objectProperty(node.name, value), node)
}

export default function() {
  return {
    name: 'babel-plugin-jsxui',
    inherits: jsx,
    pre() {
      this.cache = new Set()
    },
    visitor: {
      JSXOpeningElement(path) {
        if (path.node.name.name === 'Overrides') {
          const [valuePath] = path.get('attributes')
          const expressionPath = valuePath.get('value').get('expression')
          const expressionName = expressionPath.node.name
          const binding = expressionPath.scope.getBinding(expressionName)
          let arrayExpression
          if (binding) {
            if (!this.cache.has(expressionName)) {
              arrayExpression = binding.path.get('init')
              this.cache.add(expressionName)
            }
          } else {
            arrayExpression = expressionPath
          }
          if (arrayExpression) {
            arrayExpression.get('elements').forEach(element => {
              const openingElement = element.get('openingElement')
              if (openingElement.node) {
                const { name } = openingElement.node.name
                const objectValue = openingElement.node.attributes.map(
                  convertAttribute
                )
                element.replaceWith(
                  t.arrayExpression([
                    name[0] === name[0].toUpperCase()
                      ? t.identifier(name)
                      : t.stringLiteral(name),
                    t.objectExpression(objectValue),
                  ])
                )
              }
            })
          }
        }
      },
    },
  }
}

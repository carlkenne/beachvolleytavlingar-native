import { _ } from 'lodash'
// import { DOMParser } from 'react-native-html-parser'
import parseHtml from 'react-native-parse-html'

const get = (value, _default) => (value === undefined ? _default : value)

export const getAttribute = (node, name) =>
  get(node.attrs, []).find(attr => attr.name === name).value

const hasAttributeValue = (node, attributeName, value) =>
  get(node.attrs, []).find(
    attr => attr.name === attributeName && attr.value.split(' ').includes(value)
  )

const byClassName = className => node =>
  hasAttributeValue(node, 'class', className)
const byAttribute = (attributeName, attributeValue) => node =>
  hasAttributeValue(node, attributeName, attributeValue)
const byTagName = tagName => node => node.tagName === tagName
const byNodeName = nodeName => node => node.nodeName === nodeName

const selectElements = (node, comparator) =>
  _.flatMapDeep([
    comparator(node) ? node : [],
    get(node.childNodes, []).map(childNode =>
      selectElements(childNode, comparator)
    )
  ])

const getComparator = selector => {
  // .maincontent
  if (selector.indexOf('.') === 0) {
    return byClassName(selector.substr(1))
  }
  // td.uh
  if (selector.indexOf('.') > 0) {
    const selectors = selector.split('.')
    return node =>
      byTagName(selectors[0])(node) && byClassName(selectors[1])(node)
  }
  // a[title="name"] or .uh[title="name"]
  // untested
  if (selector.includes('[')) {
    const selectors = selector.split('[')
    const attributes = selector[1]
      .split(']')
      .join('')
      .split('"')
      .join('')
      .split('=')

    return node =>
      getComparator(selectors[0])(node) &&
      byAttribute(attributes[0], attributes[1])(node)
  }
  // tr
  return byTagName(selector)
}

const getSelectorMethod = selector => {
  const comparator = getComparator(selector)
  return root => selectElements(root, comparator)
}

export const getText = node =>
  selectElements(node, byNodeName('#text'))
    .reduce((accu, n) => accu + ' ' + n.value, '')
    .trim()

class DomParser {
  constructor(htmlString) {
    this.dom = parseHtml.parse(htmlString)
  }

  querySelect = (querySelector, node = this.dom) => {
    const selectors = querySelector.split(' ')
    return selectors.reduce(
      (elements, selector) => {
        const selectorMethod = getSelectorMethod(selector)
        return elements.reduce(
          (elems, element) =>
            _.flatMapDeep(elems.concat(selectorMethod(element))),
          []
        )
      },
      [node]
    )
  }
}

export const getDomParser = htmlString => new DomParser(htmlString)

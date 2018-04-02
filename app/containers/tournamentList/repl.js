import _ from 'lodash'

const get = (value, _default) => (value === undefined ? _default : value)

const getElementsByTagName = (node, name) => [
  ...(node.tagName === name ? [node] : []),
  ...get(node.childNodes, []).map(childNode =>
    getElementsByTagName(childNode, name)
  )
]

const hasClass = (node, className) =>
  get(node.attrs, []).find(
    attr => attr.name === 'class' && attr.value.split(' ').includes(className)
  )

const getElementsByClass = (node, className) => [
  hasClass(node, className) ? node : [],
  get(node.childNodes, []).map(childNode =>
    getElementsByClass(childNode, className)
  )
]

const getSelectorMethod = selector => {
  console.log(' ')
  return selector.includes('.')
    ? node => getElementsByClass(node, selector.substr(1))
    : node => getElementsByTagName(node, selector)
}

const getElements = (root, querySelector) => {
  const selectors = querySelector.trim().split(' ')
  return selectors.reduce(
    (accu, selector) => {
      console.log('accu')
      console.log(JSON.stringify(accu))

      const selectorMethod = getSelectorMethod(selector)
      const res = accu.reduce(
        (elems, element) => elems.concat(selectorMethod(element)),
        []
      )
      console.log(JSON.stringify(res))
      return res
    },
    [root]
  )
}

".as".indexOf('.')

"1.2.3".replace('.', '')

/*
const ByTagName = getElements(
  {
    attrs: [{ name: 'class', value: 'main' }],
    childNodes: [
      {
        attrs: [{ name: 'class', value: 'rätt' }],
        tagName: 'ss'
      }
    ]
  },
  'ss'
)

console.log(JSON.stringify(ByTagName))

const byClass = getElements(
  {
    tagName: 's',
    childNodes: [
      {
        attrs: [{ name: 'class', value: 'fel' }],
        tagName: 'ss'
      },
      {
        attrs: [{ name: 'class', value: 'main' }],
        childNodes: [
          {
            attrs: [{ name: 'class', value: 'rätt' }],
            tagName: 'ss'
          }
        ]
      }
    ]
  },
  '.main'
)

console.log(JSON.stringify(byClass))
*/
const el = getSelectorMethod('.s')({
  tagName: 'sss',
  childNodes: [
    {
      tagName: 's'
    },
    {
      attrs: [{ name: 'class', value: 's' }]
    }
  ],
  attrs: [{ name: 'class', value: 'main' }]
})
console.log(JSON.stringify(el))

const els = getElements(
  {
    tagName: 's',
    childNodes: [
      {
        attrs: [{ name: 'class', value: 'fel' }],
        tagName: 'ss'
      },
      {
        attrs: [{ name: 'class', value: 'main' }],
        childNodes: [
          {
            attrs: [{ name: 'class', value: 'rätt' }],
            tagName: 'ss'
          }
        ]
      }
    ]
  },
  '.main ss'
)
console.log(els.length)
console.log(JSON.stringify(els))

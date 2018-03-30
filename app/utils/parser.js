import { _ } from 'lodash'
import { DOMParser } from 'react-native-html-parser'

export const getHrefByTitle = (doc, title) => {
  const href = _.flatMap(
    doc
      .querySelect('a[title="' + title + '"]')
      .map(tag => Array.from(tag.attributes))
  ).find(attr => attr.name === 'href')

  return href ? href.value : ''
}

export const getDomParser = htmlString =>
  new DOMParser({
    locator: {},
    errorHandler: {
      warning: w => console.warn(w), // eslint-disable-line
      error: e => console.error(e), // eslint-disable-line
      fatalError: fe => console.error(fe) // eslint-disable-line
    }
  }).parseFromString(htmlString, 'text/html')

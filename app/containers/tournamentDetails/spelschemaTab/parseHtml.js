import { _ } from 'lodash'
import { getDomParser } from '../../../utils/parser'
import { getClassNameSelectors } from '../../../utils/classTypes'

const prepareSelectors = html =>
  getClassNameSelectors().reduce(
    (modifiedHtml, classNameSelector) =>
      modifiedHtml.replace(
        `title="${classNameSelector.selector}"`,
        `title="${classNameSelector.renamedSelector}"`
      ),
    html
  )

const getUrl = (parser, name) => {
  const elements = parser.querySelect('a[title="' + name + '"]')
  const href = _.flatMap(elements.map(el => el.attrs)).find(
    attr => attr.name === 'href'
  )
  return href ? href.value : ''
}

export const parseKlassLinks = data => {
  if (data.status !== 200) {
    throw new Error('no links for results available')
  }
  const parser = getDomParser(prepareSelectors(data.response))

  console.log('data.response: ', data)

  const links = getClassNameSelectors()
    .map(className => ({
      url: getUrl(parser, className.renamedSelector),
      className: className.displayName
    }))
    .filter(link => link.url !== '' && link.url !== '#')

  if (links.length === 0) {
    throw new Error('no links for results available')
  }
  console.log('links: ', links)
  return links
}

const getTeam = teamName => {
  // sometimes teamnames are duplicated
  const halfTeam = teamName.substring(teamName.length / 2)
  if (teamName === `${halfTeam}${halfTeam}`) {
    return halfTeam
  }
  return teamName
}

const parse = data => {
  console.log('data: ', data)
  const doc = getDomParser(data.response.response)
  const tables = doc.querySelect(`tbody`)

  const table = tables
    .filter(
      t =>
        _.get(t, 'childNodes[1].childNodes[1].firstChild.nodeValue') ===
        'Position'
    )
    .find(
      t =>
        _.get(t, 'childNodes[1].childNodes[3].firstChild.nodeValue') ===
        'Lagnavn'
    )
  if (!table) {
    return undefined
  }

  const teams = _.drop(table.querySelect('tr'), 1)
    .map(row => row.querySelect('td'))
    .map((tds, index) => ({
      position: tds[0].textContent,
      team: getTeam(tds[1].textContent),
      id: index.toString()
    }))

  return {
    className: data.link.className,
    teams,
    top4Teams: _.take(teams, 4)
  }
}

const parseHTML = datas => ({
  results: datas.map(parse).filter(result => result !== undefined)
})

export default parseHTML

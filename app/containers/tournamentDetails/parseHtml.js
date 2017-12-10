import { DOMParser } from 'react-native-html-parser'
import { _ } from 'lodash'
import { parseDate } from '../../utils/date'

const get = (array, key) => {
  const result = _.find(array, { key })
  return result ? result.value : ''
}

const parseHTML = data => {
  const doc = new DOMParser({
    locator: {},
    errorHandler: {
      warning: w => console.log(w), // eslint-disable-line
      error: e => console.log(e), // eslint-disable-line
      fatalError: fe => console.log(fe), // eslint-disable-line
    },
  }).parseFromString(data.response, 'text/html')

  const parsed = doc.querySelect('td[class="uh"]').map(uhTag => ({
    key: uhTag.textContent.trim(),
    value: uhTag.nextSibling ? uhTag.nextSibling.textContent.trim() : '',
  }))

  console.log(parsed)

  const tournamentDetails = {
    arena: get(parsed, 'Spelplats/hall'),
    resultatLink: get(parsed, 'Spelschema och resultat'),
    registrationLink: get(parsed, 'Anmälan'),
    link: 'to me',
    table: 'table',
    setServerSessionCookieUrl: '',
    date: parseDate(
      get(parsed, 'Från:') + ' ' + get(parsed, 'kl:').replace('.', ':'),
      get(parsed, 'Till:') + ' ' + get(parsed, 'ca kl:').replace('.', ':'),
    ),
    maxNoOfTeams: 2,
  }
  console.log(tournamentDetails)
  return { tournamentDetails }
}

export default parseHTML

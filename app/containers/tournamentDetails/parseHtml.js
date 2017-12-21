import { DOMParser } from 'react-native-html-parser'
import { _ } from 'lodash'
import { parseDate } from '../../utils/date'

export const get = (array, key, pos = 0, format = f => f) => {
  const result = _.find(array, obj => obj.key.startsWith(key))
  return result &&
    result.values &&
    result.values.length > pos &&
    result.values[pos] !== ''
    ? format(result.values[pos])
    : undefined
}

const getContact = (parsed, pos) => {
  const contact = {
    name: get(parsed, 'Namn', pos),
    phone: get(parsed, 'Telefon', pos),
    email: get(parsed, 'Epost', pos),
    id: pos,
  }
  return contact.name ? [contact] : []
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

  const iterateSiblings = el => {
    if (el) {
      return [el.textContent.trim(), ...iterateSiblings(el.nextSibling)]
    }
    return []
  }

  const parsed = doc.querySelect('td[class="uh"]').map(uhTag => ({
    key: uhTag.textContent.trim(),
    values: iterateSiblings(uhTag.nextSibling),
  }))
  console.log('parsed: ', parsed)

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
    paymentInfo: get(parsed, 'Inbetalningsinfo'),
    info: get(parsed, 'Övrig info'),
    deadline: parseDate(get(parsed, 'Sista anmäliningsdag')),
    noOfDam: get(parsed, 'Dam'),
    noOfHerr: get(parsed, 'Herr'),
    priceDam: get(parsed, 'Dam', 2, value => value.remove('.00')),
    priceHerr: get(parsed, 'Herr', 2, value => value.remove('.00')),
    contacts: [...getContact(parsed, 0), ...getContact(parsed, 1)],
  }

  console.log('tournamentDetails: ', tournamentDetails)
  return { tournamentDetails }
}

export default parseHTML

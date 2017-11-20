import { DOMParser } from 'react-native-html-parser'
import { _ } from 'lodash'

const sectionHeaders = {
  tp1: 'TP 1 (1 jan - 4 april)',
}

const tournamentData = {
  tp1: [
    {
      name: 'Trettondagsturneringen - Challenger',
      type: 'challenger',
      date: 'fre, 7 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'Trettondagsturneringen - Open grön',
      type: 'opengrön',
      date: 'lör, 8 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'Trettondagsturneringen - Open svart',
      type: 'opensvart',
      date: 'sön, 9 jan',
      club: 'Göteborg BC',
    },
    {
      name: 'MBC Active Beach Challenger',
      type: 'challenger',
      date: 'lör, 15 jan',
      club: 'Malmö BC',
    },
    {
      name: '08 Beachvolley Open Svart',
      type: 'opensvart',
      date: 'lör, 17 feb',
      club: '08 Beachvolley Club',
    },
    {
      name: 'IKSU Beachvolley damchallenger, v8',
      type: 'opensvart',
      date: 'lör, 18 feb',
      club: 'IK Studenterna i Umeå',
    },
    {
      name: 'IKSU Beachvolley herrchallenger, v8',
      type: 'opensvart',
      date: 'sön, 19 feb',
      club: 'IK Studenterna i Umeå',
    },
  ],
}
const parseClass = className =>
  className
    .split(',')
    .map(item => item.replace(/\s/g, '').toLowerCase())
    .filter(item => item !== 'd')
    .filter(item => item !== 'h')
    .map(item => (item.startsWith('v35+d') ? 'v35+dam' : item))
    .map(item => (item.startsWith('v35+h') ? 'v35+herr' : item))
    .map(item => (item.startsWith('v40+d') ? 'v40+dam' : item))
    .map(item => (item.startsWith('v40+h') ? 'v40+herr' : item))
    .map(item => (item.startsWith('v45+d') ? 'v45+dam' : item))
    .map(item => (item.startsWith('v45+h') ? 'v45+herr' : item))

const getSafeDate = dateString => new Date(dateString)

const parseDate = (fromString, toString) => {
  const from = getSafeDate(fromString)
  const to =
    toString.split('.').length === 3
      ? getSafeDate(toString)
      : getSafeDate(toString + '.' + from.getFullYear())

  return { from, to }
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

  const rows = doc
    .querySelect('.maincontent tr')
    .filter(row => row.attributes.length > 0)
    .map(row => ({
      date: parseDate(
        row.childNodes[0].textContent,
        row.childNodes[2].textContent,
      ),
      tp: row.childNodes[4].textContent,
      club: row.childNodes[6].textContent,
      tournament: row.childNodes[8].textContent,
      level: row.childNodes[10].textContent,
      class: parseClass(row.childNodes[12].textContent),
    }))

  console.log(_.take(rows, 10))

  return { sectionHeaders, tournamentData }
}

export default parseHTML

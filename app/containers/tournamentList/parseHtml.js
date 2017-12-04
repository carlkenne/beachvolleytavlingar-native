import { DOMParser } from 'react-native-html-parser'
import { _ } from 'lodash'
import { parseDate } from '../../utils/date'

const getSectionHeaders = year => {
  if (year === '2017') {
    return {
      tp01: {
        name: 'TP 01',
        number: 1,
        date: parseDate('1 jan 2017', '2 april 2017'),
      },
      tp02: {
        name: 'TP 02',
        number: 2,
        date: parseDate('3 april 2017', '21 may 2017'),
      },
      tp03: {
        name: 'TP 03',
        number: 3,
        date: parseDate('22 may 2017', '4 jun 2017'),
      },
      tp04: {
        name: 'TP 04',
        number: 4,
        date: parseDate('5 jun 2017', '11 jun 2017'),
      },
      tp05: {
        name: 'TP 05',
        number: 5,
        date: parseDate('12 jun 2017', '25 jun 2017'),
      },
      tp06: {
        name: 'TP 06',
        number: 6,
        date: parseDate('26 jun 2017', '2 jul 2017'),
      },
      tp07: {
        name: 'TP 07',
        number: 7,
        date: parseDate('3 jul 2017', '9 jul 2017'),
      },
      tp08: {
        name: 'TP 08',
        number: 8,
        date: parseDate('10 jul 2017', '16 jul 2017'),
      },
      tp09: {
        name: 'TP 09',
        number: 9,
        date: parseDate('17 jul 2017', '23 jul 2017'),
      },
      tp10: {
        name: 'TP 10',
        number: 10,
        date: parseDate('24 jul 2017', '30 jul 2017'),
      },
      tp11: {
        name: 'TP 11',
        number: 11,
        date: parseDate('31 jul 2017', '6 aug 2017'),
      },
      tp12: {
        name: 'TP 12',
        number: 12,
        date: parseDate('7 aug 2017', '13 aug 2017'),
      },
      tp13: {
        name: 'TP 13',
        number: 13,
        date: parseDate('14 aug 2017', '20 aug 2017'),
      },
      tp14: {
        name: 'TP 14',
        number: 14,
        date: parseDate('21 aug 2017', '3 sep 2017'),
      },
      tp15: {
        name: 'TP 15',
        number: 15,
        date: parseDate('4 sep 2017', '15 oct 2017'),
      },
      tp16: {
        name: 'TP 16',
        number: 16,
        date: parseDate('16 oct 2017', '31 dec 2017'),
      },
    }
  }
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
      tp: row.childNodes[4].textContent
        .split(' ')
        .join('')
        .toLowerCase(),
      club: row.childNodes[6].textContent,
      name: row.childNodes[8].textContent,
      type: row.childNodes[10].textContent,
      class: parseClass(row.childNodes[12].textContent),
    }))

  const groups = _.groupBy(rows, 'tp')

  return { sectionHeaders: getSectionHeaders('2017'), tournamentData: groups }
}

export default parseHTML

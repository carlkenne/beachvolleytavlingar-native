import moment from 'moment'
import 'moment/locale/sv'

moment.locale('sv')

const formatDMMM = date => moment(date).format('D MMM')
const getSafeDate = dateString => moment(dateString.split('.').join('-'))
const getDuration = (from, to, format) =>
  [...new Set([from, to].map(date => moment(date).format(format)))].join(' - ')

const getDetailedDuration = (from, to) => {
  const detailedFormat = 'ddd, D MMM HH:mm'

  if (
    formatDMMM(from) === formatDMMM(to) &&
    from.toString() !== to.toString()
  ) {
    return `${moment(from).format(detailedFormat)} - ${moment(to).format(
      'HH:mm'
    )}`
  }
  return getDuration(from, to, detailedFormat)
}

const toTime = time =>
  time
    .split('.')
    .join(':')
    .split(':')
    .map(t => (t.length === 1 ? `0${t}` : t))
    .join(':')

export const toISO = (date, time) => `${date}T${toTime(time)}`
export const parseDate = (fromString, toString = fromString) => {
  const from = getSafeDate(fromString)
  const to =
    toString.split('.').length === 3
      ? getSafeDate(toString)
      : getSafeDate(from.year() + '.' + toString)

  return {
    from,
    to,
    getDuration: format => getDuration(from, to, format),
    getDetailedDuration: () => getDetailedDuration(from, to)
  }
}

export const isOldDate = date => date.from < moment()

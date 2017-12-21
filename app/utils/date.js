import moment from 'moment'

const getSafeDate = dateString => new Date(dateString)
const getDuration = (from, to, format) =>
  [...new Set([from, to].map(date => moment(date).format(format)))].join(' - ')

export const parseDate = (fromString, toString = fromString) => {
  const from = getSafeDate(fromString)
  const to =
    toString.split('.').length === 3
      ? getSafeDate(toString)
      : getSafeDate(toString + '.' + from.getFullYear())

  return {
    from,
    to,
    getDuration: format => getDuration(from, to, format),
  }
}

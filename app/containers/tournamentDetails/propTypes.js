import PropTypes from 'prop-types'
import { dateShape } from '../propTypes'

export const teamShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  adress: '',
  club: PropTypes.string.isRequired
})

export const tournamentDetailsShape = PropTypes.shape({
  date: dateShape.isRequired,
  deadline: dateShape.isRequired,
  arena: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string,
      email: PropTypes.string
    })
  ).isRequired,
  info: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  location: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired
    })
  ).isRequired,
  paymentInfo: PropTypes.string,
  registrationLink: PropTypes.string,
  setServerSessionCookieUrl: PropTypes.string,
  resultatLink: PropTypes.string,
  table: PropTypes.string
})

export const resultTeamShape = PropTypes.shape({
  position: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
})

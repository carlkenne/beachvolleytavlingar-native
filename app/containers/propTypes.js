import PropTypes from 'prop-types'

export const dateShape = PropTypes.shape({
  from: PropTypes.shape().isRequired,
  to: PropTypes.shape().isRequired,
  getDuration: PropTypes.func.isRequired,
  getDetailedDuration: PropTypes.func.isRequired
})

export const tournamentInfoShape = PropTypes.shape({
  tp: PropTypes.string.isRequired,
  adress: '',
  club: PropTypes.string.isRequired,
  qualifier: PropTypes.string,
  name: PropTypes.string.isRequired,
  originalName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  class: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  date: dateShape.isRequired,
  active: PropTypes.bool.isRequired
})

import { Link } from 'react'
import { connect } from 'react-redux'
import { toggleFilter } from '../containers/tournamentListFilter/actions'

const mapStateToProps = (state) => ({
  filter: state.filter
})

const mapDispatchToProps = (dispatch) => ({
  filterClick: (index, value) => {
    dispatch(toggleFilter(index, value))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink

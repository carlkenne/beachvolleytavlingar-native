import { connect } from 'react-redux'
import { toggleFilter } from '../actions/filterActions'
import view from '../components/TournamentListFilter'

const mapStateToProps = (state, ownProps) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterClick: (index, value) => {
      dispatch(toggleFilter(index, value))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default TournamentListFilter

import { TOGGLE_FILTER } from './actions'
import cloneObject from '../../utils/clone'
import { FETCH_TOURNAMENTLIST_SUCCESS } from '../tournamentList/epic'

const find = (array, predicate, _default) => {
  const result = array.find(predicate)
  return result || _default
}

const initialState = {
  levels: []
}

const getValueFor = (type, levels) =>
  find(levels, lvl => lvl.type === type, { value: true }).value
const getLabelFor = type => type

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TOURNAMENTLIST_SUCCESS: {
      const _state = cloneObject(state)
      _state.levels = action.types.map(type => ({
        type,
        value: getValueFor(type, _state.levels),
        label: getLabelFor(type)
      }))
      return _state
    }
    case TOGGLE_FILTER: {
      const _state = cloneObject(state)
      _state.levels[action.index].value = action.value
      return {
        ..._state
      }
    }
    default:
      return state
  }
}

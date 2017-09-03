import { TOGGLE_FILTER } from './actions'
import cloneObject from '../../lib/clone'

const initialState = {
  levels: [
    { type: 'challenger', value: true, label: 'Challenger' },
    { type: 'opensvart', value: true, label: 'Open svart' },
    { type: 'opengrön', value: true, label: 'Open grön' },
  ],
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const _state = cloneObject(state)
      _state.levels[action.index].value = action.value
      return {
        ..._state,
      }
    }
    default:
      return state
  }
}

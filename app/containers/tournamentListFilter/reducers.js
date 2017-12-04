import { TOGGLE_FILTER } from './actions'
import cloneObject from '../../utils/clone'

const initialState = {
  levels: [
    { type: 'Challenger', value: true, label: 'Challenger' },
    { type: 'Open Svart', value: true, label: 'Open svart' },
    { type: 'Open Grön', value: true, label: 'Open grön' },
    { type: 'Veterantävling', value: true, label: 'Veteran' },
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

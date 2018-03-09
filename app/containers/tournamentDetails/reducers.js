import cloneObject from '../../utils/clone'
import * as consts from './epic'

const initialState = {
  loaded: false,
  loading: true,
  details: undefined
}

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case consts.FETCH_TOURNAMENT_DETAILS: {
      const _state = cloneObject(state)
      return {
        ..._state,
        loaded: false,
        loading: true,
        details: undefined
      }
    }
    case consts.FETCH_TOURNAMENT_DETAILS_SUCCESS: {
      const _state = cloneObject(state)
      return {
        ..._state,
        loaded: true,
        loading: false,
        details: action.tournamentDetails
      }
    }
    case consts.FETCH_TOURNAMENT_DETAILS_FAILED: {
      const __state = cloneObject(state)
      return {
        ...__state,
        loaded: false,
        loading: false,
        details: undefined
      }
    }
    default:
      return state
  }
}

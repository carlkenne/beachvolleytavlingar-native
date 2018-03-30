import * as consts from './epic'
import cloneObject from '../../utils/clone'

const initialState = {
  loaded: false,
  loading: false,
  sectionHeaders: {},
  tournamentData: {},
  error: 'no error'
}

export default function(state = initialState, action = {}) {
  console.log('action: ', action)
  switch (action.type) {
    case consts.FETCH_TOURNAMENTLIST: {
      let _state = cloneObject(state)
      _state = {
        ..._state,
        loaded: false,
        loading: true
      }
      return _state
    }
    case consts.FETCH_TOURNAMENTLIST_SUCCESS: {
      let _state = cloneObject(state)
      _state = {
        ..._state,
        loaded: true,
        loading: false,
        sectionHeaders: action.sectionHeaders,
        tournamentData: action.tournamentData
      }
      return _state
    }
    case consts.FETCH_TOURNAMENTLIST_FAILED: {
      return {
        ...initialState,
        error: 'error ' + JSON.stringify(action.payload)
      }
    }
    default:
      return state
  }
}

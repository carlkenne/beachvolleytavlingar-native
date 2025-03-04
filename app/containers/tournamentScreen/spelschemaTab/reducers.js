import cloneObject from '../../../utils/clone'
import {
  FETCH_SPELSCHEMA_SUCCESS,
  FETCH_SPELSCHEMA_FAILED,
  FETCH_SPELSCHEMA
} from './epic'

const initialState = {
  loading: false,
  results: undefined
}

export default function(state = initialState, action = {}) {
  console.log('action.type: ', action.type)
  switch (action.type) {
    case FETCH_SPELSCHEMA: {
      return { ...cloneObject(state), loading: true }
    }
    case FETCH_SPELSCHEMA_SUCCESS: {
      return { ...cloneObject(state), ...action.payload, loading: false }
    }
    case FETCH_SPELSCHEMA_FAILED: {
      return initialState
    }
    default:
      return state
  }
}

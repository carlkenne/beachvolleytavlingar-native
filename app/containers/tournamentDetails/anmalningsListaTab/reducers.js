import cloneObject from '../../../utils/clone';
import {
  GET_ANMALNINGSLISTA_SUCCESS,
  GET_ANMALNINGSLISTA_FAILED,
  GET_ANMALNINGSLISTA,
} from './epic';

const initialState = {
  loading: false,
  classes: [],
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case GET_ANMALNINGSLISTA: {
      return { ...cloneObject(state), loading: true };
    }
    case GET_ANMALNINGSLISTA_SUCCESS: {
      return { ...cloneObject(state), ...action.payload, loading: false };
    }
    case GET_ANMALNINGSLISTA_FAILED: {
      return initialState;
    }
    default:
      return state;
  }
}

import cloneObject from '../../utils/clone';
import * as consts from './epic';

const initialState = {
  loaded: false,
  loading: true,
  details: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case consts.GET_TOURNAMENT_DETAILS_SUCCESS: {
      let _state = cloneObject(state);
      _state = {
        ..._state,
        loaded: true,
        loading: false,
        details: action.tournamentDetails,
      };
      return _state;
    }
    case consts.GET_TOURNAMENT_DETAILS_FAILED: {
      let __state = cloneObject(state);
      __state = {
        ...state,
        loaded: false,
        loading: false,
        details: {},
      };
      return __state;
    }
    default:
      return state;
  }
}

import * as consts from './constants';
import cloneObject from '../../lib/clone';

const initialState = {
  loaded: false,
  sectionHeaders: {},
  tournamentData: {}
};


export default function (state = initialState, action = {}) {
  switch (action.type) {
    case consts.GET_TOURNAMENTLIST_SUCCESS: {
      let _state = cloneObject(state);
      _state = {
        ..._state,
        loaded: true,
        sectionHeaders: action.sectionHeaders,
        tournamentData: action.tournamentData
      }
      return _state;
    }
    case consts.GET_TOURNAMENTLIST_FAILED: {
      let __state = cloneObject(state);
      __state = {
        ...state,
        loaded: false,
        sectionHeaders: action.sectionHeaders,
        tournamentData: action.tournamentData
      }
      return __state;
    }
    default:
      return state;
  }
}

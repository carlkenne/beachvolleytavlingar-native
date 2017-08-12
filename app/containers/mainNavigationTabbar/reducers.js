import * as consts from './constants';
import cloneObject from '../../lib/clone';

const initialState = {
  selectedTab: 'tournamentListTab'
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case consts.TOGGLE_TAB: {
      const _state = cloneObject(state);
      _state.selectedTab = action.tabName;
      return _state;
    }
    default:
      return state;
  }
}

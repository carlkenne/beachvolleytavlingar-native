import * as consts from './constants';
import cloneObject from 'beachvolleytavlingar/app/lib/clone';

let initialState = {
  selectedTab: ''
};

export default function (state = initialState, action = {}) {
  switch(action.type) {
    case consts.TOGGLE_TAB:
      let _state = cloneObject(state);
      _state.selectedTab = action.tabName;
      return _state;
    default:
      return state;
  }
}

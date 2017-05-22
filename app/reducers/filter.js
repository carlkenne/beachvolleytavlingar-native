import * as types from '../actions/actionTypes';
import cloneObject from 'beachvolleytavlingar/app/lib/clone';

let initialState = {
  levels:[
    { label: 'Challengers', type: 'challenger', value: true },
    { label: 'Open Svart', type: 'opensvart', value: true },
    { label: 'Open Grön', type: 'opengrön', value: false },
  ]
};

export default function (state = initialState, action = {}) {
  switch(action.type) {
    case types.TOGGLE_FILTER:
      let _state = cloneObject(state);
      _state.levels[action.index].value = action.value;
      return _state;
    default:
      return state;
  }
}

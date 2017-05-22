import * as types from './constants';

export const toggleTab = (tabName) => {
  return {
    type: types.TOGGLE_TAB,
    tabName
  };
}

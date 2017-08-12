import * as types from './constants';

export const toggleTab = (tabName) => ({
    type: types.TOGGLE_TAB,
    tabName
  })

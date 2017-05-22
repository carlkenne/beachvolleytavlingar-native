import * as types from './actionTypes';

export const toggleFilter = (index, value) => {
  return {
    type: types.TOGGLE_FILTER,
    index,
    value
  };
}

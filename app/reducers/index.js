import { combineReducers } from 'redux';
import filter from '../containers/tournamentListFilter/reducers';
import tournamentList from '../containers/tournamentList/reducers';
import mainNavigation from '../containers/mainNavigationTabbar/reducers';

const reducers = combineReducers({
  filter,
  tournamentList,
  mainNavigation
})

export default reducers

import 'rxjs'
import { combineReducers } from 'redux'
import filter from '../containers/tournamentListFilter/reducers'
import tournamentList from '../containers/tournamentList/reducers'
import mainNavigation from '../containers/mainNavigationTabbar/reducers'
import tournamentDetails from '../containers/tournamentScreen/reducers'
import anmalningslista from './tournamentScreen/anmalningsListaTab/reducers'
import spelschema from './tournamentScreen/spelschemaTab/reducers'

const reducers = combineReducers({
  filter,
  tournamentList,
  tournamentDetails,
  mainNavigation,
  anmalningslista,
  spelschema
})

export default reducers

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import MainNaviagtionTabBar from './mainNavigationTabbar'
import sagas from './tournamentList/sagas'

const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers)

// Extensions
sagaMiddleware.run(sagas)

export default function App() {
  return (
    <Provider store={store}>
      <MainNaviagtionTabBar />
    </Provider>
  )
}

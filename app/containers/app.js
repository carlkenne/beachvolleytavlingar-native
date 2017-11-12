import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import { ThemeProvider } from 'styled-components/native'
import reducers from '../reducers'
import MainNaviagtionTabBar from './mainNavigationTabbar'
import sagas from './tournamentList/sagas'
import theme from './theme'

const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers)

// Extensions
sagaMiddleware.run(sagas)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainNaviagtionTabBar />
      </Provider>
    </ThemeProvider>
  )
}

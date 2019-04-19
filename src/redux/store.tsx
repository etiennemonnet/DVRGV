import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducers'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['profile']
}
const persistedReducer = persistReducer(persistConfig, appReducer)

const epicMiddleware = createEpicMiddleware();
const store = createStore(persistedReducer, applyMiddleware(epicMiddleware))
epicMiddleware.run(rootEpic)

const persistor = persistStore(store)

export { store, persistor }


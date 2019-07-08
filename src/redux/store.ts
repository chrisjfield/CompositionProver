import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const persistConfig: PersistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(logger))
    let persistor = persistStore(store)
    return { store, persistor }
}

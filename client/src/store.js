import { createStore, combineReducers } from 'redux'
import rootReducer from './reducers/reducer'

const store = createStore(combineReducers({rootReducer}), {})

export default store;


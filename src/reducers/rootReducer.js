import {combineReducers} from 'redux'
import markersReducer from './markersReducer.js'
import userReducer from './userReducer.js'

const rootReducer = combineReducers({markers: markersReducer, currentUser: userReducer})
export default rootReducer
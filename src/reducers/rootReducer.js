import {combineReducers} from 'redux'
import markersReducer from './markersReducer.js'
import userReducer from './userReducer.js'
import mapsReducer from './mapsReducer.js'

const rootReducer = combineReducers({maps: mapsReducer, markers: markersReducer, currentUser: userReducer})
export default rootReducer
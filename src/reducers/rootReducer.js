import {combineReducers} from 'redux'
import markersReducer from './markersReducer.js'


const rootReducer = combineReducers({markers: markersReducer})
export default rootReducer
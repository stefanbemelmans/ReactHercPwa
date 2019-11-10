import { combineReducers } from 'redux'
import ApplicationState from './ApplicationState'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})



import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from "redux"
import notificationReducer from './reducers/notificationReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  errorNotification: errorNotificationReducer
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
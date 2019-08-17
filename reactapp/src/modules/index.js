import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import app from './app'
import { reducer as editorReducer } from './editor'
import { connectRouter } from 'connected-react-router'

export default history =>
  combineReducers({
    app,
    editor: editorReducer,
    firebase: firebaseReducer,
    router: connectRouter(history)
  })

import UserInfoReducer from './userInfo'
import IsLoggedReducer from './isLogged'
import {combineReducers} from 'redux'

const RootReducer = combineReducers({
  UserInfo : UserInfoReducer,
  isLogged : IsLoggedReducer,
})

export default RootReducer
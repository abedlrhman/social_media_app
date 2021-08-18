import {AGE, AVATAR, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD} from '../actionTypes'

const UserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case FIRST_NAME : 
      return {
        ...state,
        firstName: action.firstName,
      };
    case LAST_NAME : 
      return {
        ...state,
        lastName: action.lastName,
      }
    case EMAIL : 
      return {
        ...state,
        email : action.email,
      }
    case AVATAR : 
      return {
        ...state,
        avatar : action.avatar,
      }
    default : 
      return state;
  }
}

export default UserInfoReducer;
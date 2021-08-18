import {SIGN_IN, ACCOUNT_UID} from '../actionTypes'

const initialState = {
  isLogged : false,
  accountUid : null,
}

const IsLoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN : 
      return {
        ...state,
        isLogged : action.isLogged,
      }
    case ACCOUNT_UID : 
      return {
        ...state,
        accountUid : action.accountUid,
      };
    default : 
      return state;
  }
}

export default IsLoggedReducer
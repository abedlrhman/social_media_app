import { SIGN_IN, ACCOUNT_UID, FIRST_NAME, LAST_NAME, EMAIL, AVATAR } from '../actionTypes'

export const IsLogged = (isLogged) => {
  return {
    type: SIGN_IN,
    isLogged,
  }
}

export const AccountUid = (accountUid) => {
  return {
    type: ACCOUNT_UID,
    accountUid,
  }
}

export const FirstName = (firstName) => {
  return {
    type: FIRST_NAME,
    firstName,
  }
}
export const LastName = (lastName) => {
  return {
    type: LAST_NAME,
    lastName,
  }
}
export const Email = (email) => {
  return {
    type: EMAIL,
    email,
  }
}
export const Avatar = (avatar) => {
  return {
    type: AVATAR,
    avatar,
  }
}
import {
    CREATE_USER,
    DUPLICATE_USER_ERROR,
    CREATE_USER_FAIL,
    AUTH_USER,
    AUTH_USER_FAIL,
    LOGOUT
  } from '../actions/authActionType';
  
  const initialState = {
    name: '',
    token: null,
    error: null
  }

  export default function authUser(state = initialState, action) {
     switch (action.type) {

        // As ações de criar e autorizar o usuário, serão
        // invocadas uma única vez no sistema, por isso, a
        // troca de estado é disparada com um único tipo de
        // payload:
        case CREATE_USER:
        case DUPLICATE_USER_ERROR:
        case CREATE_USER_FAIL:
        case AUTH_USER:
        case AUTH_USER_FAIL:
            return action.payload
  
       case LOGOUT:
            return {name: '', token: null}
        default:
          return { ...state };
     }
  }
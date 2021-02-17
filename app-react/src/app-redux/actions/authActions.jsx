import axios from 'axios';
import { deleteLocalToken } from 'resources/auth';
import { setLocalToken } from 'resources/auth';

import {
  CREATE_USER,
  DUPLICATE_USER_ERROR,
  CREATE_USER_FAIL,
  AUTH_USER,
  AUTH_USER_FAIL,
  LOGOUT
} from './authActionType';

const API = process.env.REACT_APP_API_ENDPOINT
  + process.env.REACT_APP_API_VERSION;

export function addUser(data) {
  return dispatch => {
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`${API}/user`, data,)
      .then(response => {
        if (response.data && response.data.error) {
          switch (response.data.error) {
            case 'EmailAlreadyExistsError':
              dispatch({
                type: DUPLICATE_USER_ERROR,
                payload: { error: 'Um usuário com este email já existe' }
              });
              break;
            case 'FieldDoesNotExist':
              dispatch({
                type: CREATE_USER_FAIL,
                payload: { error: 'Campos inexistentes informados' }
              });
              break;
            case 'InternalServerError':
              dispatch({
                type: CREATE_USER_FAIL,
                payload: { error: 'Um erro ocorreu ao tentar cadastrar o usuário' }
              });
              break;
            default:
              dispatch({
                type: CREATE_USER_FAIL,
                payload: { error: 'Um erro ocorreu ao tentar cadastrar o usuário' }
              });
              break;
          }
        } else {
          dispatch({
            type: CREATE_USER,
            payload: response.data
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: CREATE_USER_FAIL,
          payload: { error: 'Um erro ocorreu ao tentar cadastrar o usuário' }
        });
        console.log(err)
      });
  }
}

export function getAuth(data) {

  return dispatch => {
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`${API}/user/auth`, data)
      .then(response => {
        if (response.data && response.data.error) {
          switch (response.data.error) {
            case 'EmailAlreadyExistsError':
              dispatch({
                type: AUTH_USER_FAIL,
                payload: { error: 'Credenciais não conferem' }
              });
              break;
            default:
              dispatch({
                type: AUTH_USER_FAIL,
                payload: { error: 'Usuário não encontrado ou não autorizado' }
              });
              break;
          }
        } else {
          dispatch({
            type: AUTH_USER,
            payload: response.data
          });
          setLocalToken(response.data);
          window.location = '/start'
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_USER_FAIL,
          payload: { error: 'Um erro ocorreu ao tentar autenticar' }
        });
        console.log(err);
      });
  }
}

export function deleteAuth() {
  deleteLocalToken();
  return dispatch => {
    dispatch({
      type: LOGOUT,
      payload: { name: '', token: null }
    });
  };
}
import axios from 'axios';
import { getLocalToken } from 'resources/auth'

import {
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAIL,
  ADD_NEWS,
  ADD_NEWS_FAIL,
  UPDATE_NEWS,
  UPDATE_NEWS_FAIL,
  DELETE_NEWS,
  DELETE_NEWS_FAIL
} from '../actions/newsActionType';

const API = process.env.REACT_APP_API_ENDPOINT
          + process.env.REACT_APP_API_VERSION;

export function fetchNews() {
  return dispatch => {
      const config = {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
      };
      axios.get(`${API}/news`, config)
      .then( (response)=> {
        if (response.data && response.data.error) {
          switch (response.data.error) {
            case 'DoesNotExist':
              dispatch({
                type: FETCH_NEWS_FAIL,
                payload: {error: 'Problemas ao tentar carregar as notícias'}
              })
              break;
            case 'InternalServerError':
              dispatch({
                type: FETCH_NEWS_FAIL,
                payload: {error: 'Erro ao carregar as notícias do servidor'}
              })
              break;
            default:
              dispatch({
                type: FETCH_NEWS_FAIL,
                payload: {error: 'Erro ao carregar as notícias do servidor'}
              })
              break;
          }
        } else {
          dispatch({
            type: FETCH_NEWS_SUCCESS,
            payload: response.data
          })
        }

      })
      .catch((err)=> {
        dispatch({
          type: FETCH_NEWS_FAIL,
          payload: {error: 'Erro ao carregar as notícias do servidor'}
        })
        console.log(err);
      });

  }
}

export function addNews(data) {
    return dispatch => {
        const config = {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        };
        axios.post(`${API}/news`, data, config)
        .then(response => {
          if (response.data && response.data.error) {
            switch (response.data.error) {
              case 'FieldDoesNotExist':
                dispatch({
                  type: ADD_NEWS_FAIL,
                  payload: {error: 'Os campos para a notícia não foram aceitos pelo servidor'}
                })
                break;
              case 'InternalServerError':
                dispatch({
                  type: ADD_NEWS_FAIL,
                  payload: {error: 'Erro ao cadastrar a notícia'}
                })
                break;
              default:
                dispatch({
                  type: ADD_NEWS_FAIL,
                  payload: {error: 'Erro ao cadastrar a notícia'}
                })
                break;
            }
          } else {
            dispatch({
              type: ADD_NEWS,
              payload: response.data
            })
          }
        })
        .catch((err)=> {
          dispatch({
            type: ADD_NEWS_FAIL,
            payload: {error: 'Erro ao cadastrar a notícia'}
          })
          console.log(err);
        });
  }
}

export function updateNews(_id, data) {
  return dispatch => {
    const config = {
      headers: {
        Authorization: `Bearer ${getLocalToken()}`
      }
    };
   axios.put(`${API}/news/${_id}`, data, config)
    .then(response => {
      if (response.data && response.data.error) {
        switch (response.data.error) {
          case 'FieldDoesNotExist':
            dispatch({
              type: UPDATE_NEWS_FAIL,
              payload: {error: 'Os campos para a notícia não foram aceitos pelo servidor'}
            })
            break;
          case 'SaveConditionError':
            dispatch({
              type: UPDATE_NEWS_FAIL,
              payload: {error: 'Campos incompatíveis para alterar a notícia'}
            })
            break;
          case 'DoesNotExist':
            dispatch({
              type: UPDATE_NEWS_FAIL,
              payload: {error: 'A notícia a ser alterada não existe no servidor'}
            })
            break;

          case 'InternalServerError':
          default:
            dispatch({
              type: UPDATE_NEWS_FAIL,
              payload: {error: 'Erro ao alterar a notícia'}
            })
            break;
        }
      } else {
        dispatch({
          type: UPDATE_NEWS,
          _id,
          data: response.data
        })
      }
    })
    .catch((err)=> {
      dispatch({
        type: UPDATE_NEWS_FAIL,
        payload: {error: 'Erro ao alterar a notícia'}
      })
      console.log(err);
    });

  }
}

export function deleteNews(_id) {
  return dispatch => {
    const config = {
      headers: {
        Authorization: `Bearer ${getLocalToken()}`
      }
    };
   axios.delete(`${API}/news/${_id}`, config)
    .then(response => {
      if (response.data && response.data.error) {
        switch (response.data.error) {
          case 'DoesNotExist':
            dispatch({
              type: DELETE_NEWS_FAIL,
              payload: {error: 'A notícia a ser apagada não existe no servidor'}
            })
            break;

          case 'InternalServerError':
          default:
            dispatch({
              type: DELETE_NEWS_FAIL,
              payload: {error: 'Erro ao apagar a notícia'}
            })
            break;
        }
      } else {
        dispatch({
          type: DELETE_NEWS,
          _id
        })
      }
    })
    .catch((err)=> {
      dispatch({
        type: DELETE_NEWS_FAIL,
        payload: {error: 'Erro ao apagar a notícia'}
      })
      console.log(err);
    });
  }
}
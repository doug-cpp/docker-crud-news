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

const initialState = {
  list: [{ publishingTitle: "Título exemplo", publishingContent: "Notícia exemplo", _id: { '$oid': '' } }],
  error: null
}

export default function newsList(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case FETCH_NEWS_FAIL:
      return { ...state };

    case ADD_NEWS:
      // Ao adicionar uma notícia no banco, a api retorna
      // o obj da notícia completo, o que aqui adicionamos
      // à lista para criar um novo estado:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case ADD_NEWS_FAIL:
      return { ...state };

    case UPDATE_NEWS:
      return {
        // Do banco, vem um objeto complexo para a id:
        // {_id: {$oid: 'xxxxxx}, outro: 'dado'}, por isso,
        // foi necessário iterar com news._id['$iod'], ao
        // invés de iterar com o index de um array apenas:
        ...state,
        list: state.list.map((news) =>
          news._id['$oid'] === action._id ? { ...action.data } : news
        )
      };
    case UPDATE_NEWS_FAIL:
      return { ...state };

    case DELETE_NEWS:
      return {
        ...state,
        list: state.list.filter(news => news._id['$oid'] !== action._id)
      };
    case DELETE_NEWS_FAIL:
      return { ...state };

    default:
      return { ...state };
  }
}
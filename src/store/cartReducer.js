const data = [
  {id: 1, title: 'Велосипед', count: 5},
  {id: 2, title: 'Самокат', count: 4},
  {id: 3, title: 'Гантели', count: 7},
  {id: 4, title: 'Ракетки', count: 1}
];

const defaultState = JSON.parse(localStorage.getItem('cart')) ?? data;

const INCR = 'INCR';
const DECR = 'DECR';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

export const cartReducer = (state = defaultState, action) => {
  switch (action.type){
    case INCR:
      return state.map(item => {
        if (item.id === action.payload && item.count < 25) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    case DECR:
      return state.map(item => {
        if (item.id === action.payload) {
          if (item.count !== 1) return { ...item, count: item.count - 1 }
          return null
        }
        return item;
      }).filter(Boolean)
    case ADD_NEW_PRODUCT:
      const newProduct = {
        id: defaultState.length + 1,
        title: action.payload,
        count: 1
      }
      return [ ...state, newProduct ]
    default:
      return state;
  }
}

export const incrAction = (payload) => ({ type: INCR, payload });
export const decrAction = (payload) => ({ type: DECR, payload });
export const addNewProductAction = (payload) => ({ type: ADD_NEW_PRODUCT, payload });
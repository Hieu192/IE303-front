import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, UPDATE_ROLE_USER_FAILURE, UPDATE_ROLE_USER_REQUEST, UPDATE_ROLE_USER_SUCCESS } from "./ActionType";

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null
  };
  
  const adminUserReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case FIND_PRODUCT_BY_ID_REQUEST:
    //     return { ...state, loading: true, error: null };
    //   case FIND_PRODUCT_BY_ID_SUCCESS:
    //     return { ...state, product: action.payload, loading: false };
    //   case FIND_PRODUCT_BY_ID_FAILURE:
    //     return { ...state, loading: false, error: action.payload };
  
  
    //   case UPDATE_PRODUCT_REQUEST:
    //     return {
    //       ...state,
    //       loading: true,
    //       error: null,
    //     };
    //   case UPDATE_PRODUCT_SUCCESS:
      
    //     return {
    //       ...state,
    //       loading: false,
    //       products: state.products.map((product) =>
    //         product.id === action.payload.id ? action.payload : product
    //       ),
    //     };
    //   case UPDATE_PRODUCT_FAILURE:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: action.payload,
    //     };
      case GET_USERS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_USERS_SUCCESS:
        return { ...state, users: action.payload, loading: false, error: null };
      case GET_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };

        case UPDATE_ROLE_USER_REQUEST:
            return { ...state, loading: true, error: null };
          case UPDATE_ROLE_USER_SUCCESS:
            return { ...state, role: action.payload, loading: false, error: null };
          case UPDATE_ROLE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default adminUserReducer;


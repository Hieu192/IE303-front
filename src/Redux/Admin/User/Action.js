import api from "../../../config/api"
import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, UPDATE_ROLE_USER_FAILURE, UPDATE_ROLE_USER_REQUEST, UPDATE_ROLE_USER_SUCCESS } from "./ActionType"


export const getAllUser = () => async(dispatch) => {
    dispatch({type: GET_USERS_REQUEST})
  
    try {
        const {data} = await api.get(`/api/users/all`)
        dispatch({type: GET_USERS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_USERS_FAILURE, payload: error.message})
    }
  }

  export const updateRole = (req) => async(dispatch) => {
    dispatch({type: UPDATE_ROLE_USER_REQUEST})
  
    try {
        const {data} = await api.put(`/api/users/role/${req.userId}`, req.data)
        dispatch({type: UPDATE_ROLE_USER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: UPDATE_ROLE_USER_FAILURE, payload: error.message})
    }
  }


  

import axios from 'axios'
import {
    USER_LOGIN_ERR, USER_LOGIN_REQ, USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_ERR, USER_REGISTER_SUCCESS, USER_REGISTER_REQ,
    USER_PROFILE_REQ, USER_PROFILE_SUCCESS, USER_PROFILE_ERR, USER_PROFILE_RESET,
    USER_PROFILE_UPDATE_REQ, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_ERR, USER_LIST_REQ, USER_LIST_SUCCESS, USER_LIST_ERR, USER_LIST_RESET, USER_DELETE_REQ, USER_DELETE_SUCCESS, USER_DELETE_ERR
} from '../consts/userConsts'
import { ORDER_LIST_RESET } from '../consts/orderConsts'

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQ })

        // setup headers
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const { data } = await axios.post(`/api/users/signin`, { email, password }, config)
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const signupUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQ })

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const { data } = await axios.post(`/api/users/`, { name, email, password }, config)
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_PROFILE_RESET
    })
    dispatch({
        type: ORDER_LIST_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
}


export const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQ })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users`, config)
        dispatch({ type: USER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: USER_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const deleteUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({ type: USER_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: USER_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
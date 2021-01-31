import axios from 'axios'
import * as constants from '../consts/userConsts'
import { ORDER_LIST_RESET } from '../consts/orderConsts'

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: constants.USER_LOGIN_REQ })

        // setup headers
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const { data } = await axios.post(`/api/users/signin`, { email, password }, config)
        dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: constants.USER_LOGIN_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const signupUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: constants.USER_REGISTER_REQ })

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }
        const { data } = await axios.post(`/api/users/`, { name, email, password }, config)
        dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: constants.USER_REGISTER_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: constants.USER_LOGOUT
    })
    dispatch({
        type: constants.USER_PROFILE_RESET
    })
    dispatch({
        type: ORDER_LIST_RESET
    })
    dispatch({
        type: constants.USER_LIST_RESET
    })
}


export const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.USER_PROFILE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({ type: constants.USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: constants.USER_PROFILE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.USER_PROFILE_UPDATE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)
        dispatch({ type: constants.USER_PROFILE_UPDATE_SUCCESS, payload: data })
        dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: constants.USER_PROFILE_UPDATE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.USER_LIST_REQ })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users`, config)
        dispatch({ type: constants.USER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: constants.USER_LIST_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const deleteUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.USER_DELETE_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({ type: constants.USER_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: constants.USER_DELETE_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const editUserAdmin = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: constants.USER_EDIT_REQ })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${user._id}`, user, config)
        dispatch({ type: constants.USER_EDIT_SUCCESS, payload: data })
        dispatch({ type: constants.USER_PROFILE_SUCCESS, payload: data })
        dispatch({ type: constants.USER_PROFILE_RESET })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: constants.USER_EDIT_ERR,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
import axios from 'axios'
import { USER_LOGIN_ERR, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../consts/userConsts'

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

export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT,
    })

}
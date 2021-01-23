import { USER_LOGIN_ERR, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_ERR, USER_REGISTER_SUCCESS, USER_REGISTER_REQ } from '../consts/userConsts'

export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_REQ:
            return { loading: true }
        case USER_LOGIN_ERR:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_REQ:
            return { loading: true }
        case USER_REGISTER_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
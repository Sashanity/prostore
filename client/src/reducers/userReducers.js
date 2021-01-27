import {
    USER_LOGIN_ERR, USER_LOGIN_REQ, USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_ERR, USER_REGISTER_SUCCESS, USER_REGISTER_REQ,
    USER_PROFILE_SUCCESS, USER_PROFILE_REQ, USER_PROFILE_ERR, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_REQ, USER_PROFILE_UPDATE_ERR, USER_PROFILE_UPDATE_RESET, USER_PROFILE_RESET, USER_LIST_SUCCESS, USER_LIST_REQ, USER_LIST_ERR, USER_LIST_RESET

} from '../consts/userConsts'

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

export const getProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_PROFILE_REQ:
            return { ...state, loading: true }
        case USER_PROFILE_ERR:
            return { loading: false, error: action.payload }
        case USER_PROFILE_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_PROFILE_UPDATE_REQ:
            return { loading: true }
        case USER_PROFILE_UPDATE_ERR:
            return { loading: false, error: action.payload }
        case USER_PROFILE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_REQ:
            return { loading: true, users: [] }
        case USER_LIST_ERR:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}
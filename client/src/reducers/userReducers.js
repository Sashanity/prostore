import * as constants from '../consts/userConsts'

export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case constants.USER_LOGIN_REQ:
            return { loading: true }
        case constants.USER_LOGIN_ERR:
            return { loading: false, error: action.payload }
        case constants.USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case constants.USER_REGISTER_REQ:
            return { loading: true }
        case constants.USER_REGISTER_ERR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getProfileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case constants.USER_PROFILE_REQ:
            return { ...state, loading: true }
        case constants.USER_PROFILE_ERR:
            return { loading: false, error: action.payload }
        case constants.USER_PROFILE_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case constants.USER_PROFILE_UPDATE_REQ:
            return { loading: true }
        case constants.USER_PROFILE_UPDATE_ERR:
            return { loading: false, error: action.payload }
        case constants.USER_PROFILE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case constants.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case constants.USER_LIST_REQ:
            return { loading: true, users: [] }
        case constants.USER_LIST_ERR:
            return { loading: false, error: action.payload }
        case constants.USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case constants.USER_DELETE_REQ:
            return { loading: true }
        case constants.USER_DELETE_ERR:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userEditReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_EDIT_SUCCESS:
            return { loading: false, success: true }
        case constants.USER_EDIT_REQ:
            return { loading: true }
        case constants.USER_EDIT_ERR:
            return { loading: false, error: action.payload }
        case constants.USER_EDIT_RESET:
            return { user: {} }
        default:
            return state
    }
}
import actions from '../constants/actionTypes'
let user = localStorage.getItem("user")
user = (user !== 'undefined') ? JSON.parse(user) : null;

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const userActions = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actions.UPDATE_USER:
            return {
                ...state,
                user: payload.user,
            };
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };

        case actions.LOGOUT:
        case actions.LOGIN_FAILED:
            localStorage.removeItem("user")
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

export default userActions;
import actions from '../constants/actionTypes'
let user = localStorage.getItem("user")
user = (user !== 'undefined') ? JSON.parse(user) : null;

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        default:
            return state;
    }
}
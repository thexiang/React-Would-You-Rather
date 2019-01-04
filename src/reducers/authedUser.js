import {AUTHENTICATE_USER, SIGN_OUT} from "../actions/authedUser";

export default function authedUser(state = {}, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return action.id

        case SIGN_OUT:
            return {}
        default:
            return state
    }

}

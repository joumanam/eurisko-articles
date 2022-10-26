import { set_username, set_token } from "./actions";

const initialState = {
    name: '',
    token: ''
}

function useReducer(state = initialState, action: any) {
    switch (action.type) {
        case set_username:
            return { ...state, name: action.payload };
        case set_token:
            return { ...state, token: action.payload };
            default:
                 return state
    }
}

export default useReducer;
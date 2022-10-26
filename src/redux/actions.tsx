export const set_username = 'setUsername';
export const set_token = 'setToken';

export const setName = (name: string) => (dispatch: any) => {
    dispatch({
        type: set_username,
        payload: name
    })
}

export const setToken = (token: string) => (dispatch: any) => {
    dispatch({
        type: set_token,
        payload: token
    })
}
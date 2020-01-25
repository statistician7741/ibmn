export const addEvent = ( eventName, cb ) => dispatch => {
    return dispatch({ type: 'ADD_EVENT', eventName, cb });
};

export const setSocket = () => dispatch => {
    return dispatch({ type: 'SET_SOCKET' });
};
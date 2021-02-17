import { TOGGLE_NAVBAR, REMOVE_NAVBAR } from './layoutActionType';

export function removeNavbar() {
    return dispatch => {
        return dispatch({ type: REMOVE_NAVBAR });
    };
}

export function toggleNavbar() {
    return dispatch => {
        return dispatch({ type: TOGGLE_NAVBAR });
    };
}

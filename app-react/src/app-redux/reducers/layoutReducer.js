import { TOGGLE_NAVBAR, REMOVE_NAVBAR } from "app-redux/actions/layoutActionType";

const initialState = {
    navbar: true
};

export default function layout(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_NAVBAR:
            return { ...state, navbar: !state.navbar };

        case REMOVE_NAVBAR:
            return { ...state, navbar: false };

        default:
            return { ...state };
    }
}

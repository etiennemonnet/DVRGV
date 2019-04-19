import { CONNECTION_CHANGE, CONNECTED, DISCONNECTED } from "../actions/types";
import { ConnectionState } from "../../types";

const initialState: ConnectionState = {
    isConnected: true
}
export default (state = initialState, action) => {
    switch (action.type) {
        case CONNECTED:
        case DISCONNECTED:
            return { isConnected: action.payload }
        default: return state
    }
}
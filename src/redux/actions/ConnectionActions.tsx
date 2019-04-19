import { CONNECTED, DISCONNECTED, CONNECTION_CHANGE } from "./types";



export const connectionChange = (isConnected: boolean) => ({
    type: isConnected ? CONNECTED : DISCONNECTED,
    payload: isConnected

})
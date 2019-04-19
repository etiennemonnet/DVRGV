import { RESET_ERROR } from "./types";


export const resetError = (actionName: string) => ({
    type: RESET_ERROR,
    payload: actionName
})
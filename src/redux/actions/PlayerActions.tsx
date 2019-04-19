import {
    SET_PODCAST,
    FETCH_STREAM_INFO,
    SET_RADIO,
    FETCH_STREAM_INFO_FULFILLED,
    FETCH_STREAM_INFO_REJECTED,
    SET_PLAYER_STATUT,
    STOP_FETCH_STREAM_INFO
} from "./types";
import StreamService from "../../services/StreamService";
import 'rxjs'
import { PlayerStatut } from "../../types";



export const setPodcast = (url, title, image?) => {

    return {
        type: SET_PODCAST,
        payload: { url, title, image }
    }
}

export const setRadio = () => {
    return {
        type: SET_RADIO,
        payload: {
            url: StreamService.sourceUrl,
        }
    }
}

export const fetchStreamInfo = () => ({
    type: FETCH_STREAM_INFO,
})
export const fetchStreamInfoFulfilled = (payload) => ({
    type: FETCH_STREAM_INFO_FULFILLED,
    payload: payload
})

export const fetchStreamInfoRejected = (error) => ({
    type: FETCH_STREAM_INFO_REJECTED,
    payload: error
})

export const stopFetchStreamInfo = () => ({
    type: STOP_FETCH_STREAM_INFO
})

export const setPlayerStatut = (statut: PlayerStatut) => ({
    type: SET_PLAYER_STATUT,
    payload: statut
})
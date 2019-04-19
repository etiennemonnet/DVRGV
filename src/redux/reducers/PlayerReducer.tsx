import {
    CLEAR_PLAYER,
    FETCH_STREAM_INFO,
    STOP_PLAYER,
    SET_RADIO,
    SET_PODCAST,
    SET_PLAYER_STATUT
} from '../actions/types'

const initialState = {
    stream: {
        source: '',
        title: '',
        image: ''
    },
    podcast: {
        source: '',
        title: '',
        image: '',
    },
    statut: 'stopped', //playing,paused,stopped
    type: '' //podcast,radio
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PODCAST:
            return {
                ...state,
                podcast: {
                    source: action.payload.url,
                    title: action.payload.title,
                },
                statut: 'set',
                type: 'podcast'
            }
        case `${FETCH_STREAM_INFO}_FULFILLED`:
            return {
                ...state,
                stream: {
                    ...state.stream,
                    title: action.payload
                }
            }
        case SET_PLAYER_STATUT:{
            return{
                ...state,
                statut:action.payload
            }
        }
        case SET_RADIO:
            return {
                ...state,
                stream: {
                    ...state.stream,
                    source: action.payload.url,
                },
                statut: 'set',
                type: 'radio'
            }
        
        case STOP_PLAYER:
            return {
                stream: {
                    source: initialState.stream.source,
                    title: state.stream.title,
                    image: initialState.stream.image
                },
                podcast: initialState.podcast,
                statut: 'stopped',
                type: ''
            }

        case CLEAR_PLAYER: {
            return initialState
        }

        default: return state
    }
}
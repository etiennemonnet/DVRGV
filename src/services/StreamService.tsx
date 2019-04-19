
import axios from 'axios'
const infoUrl = `http://5.39.76.178:8000/stats?sid=1&json=1`

const StreamService = {

    sourceUrl: 'http://5.39.76.178:8000/stream',

    fetchInfo: () => {
        return axios.get(infoUrl)
    },
}

export default StreamService
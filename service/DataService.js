import axios from 'axios'

export default class DataService {
    getKiller() {
        return axios.get('./data/killer.json').then(res => res.data)
    }

    getMaps() {
        return axios.get('./data/maps.json').then(res => res.data)
    }
}
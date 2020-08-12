//import axios from 'axios'

export default class StatisticsService {
    getData() {
        //return axios.get('./demo/demo.json').then(res => res.data.data)
        return JSON.parse(localStorage.getItem('matches'))['data'];
    }

    getVictoryData() {
        const counts = [];
        const data = this.getData();

        if (data !== null) {
            data.forEach(function (v) {
                if (v.result === "victory") {
                    counts[0] = counts[0] ? counts[0] + 1 : 1;
                }

                if (v.result === "defeat") {
                    counts[1] = counts[1] ? counts[1] + 1 : 1;
                }
            })
        }

        return {
            labels: ['Victory', 'Defeat'],
            datasets: [
                {
                    backgroundColor: [
                        '#c8e6c9',
                        '#ffcdd2'
                    ],
                    data: counts
                }
            ]
        }
    }

    getKillerData() {
        const data = this.getData();
        const labels = [];
        const victories = [];
        const defeats = [];

        if (data !== null) {
            data.forEach(function (v) {
                if (!labels.includes(v.killer)) {
                    labels.push(v.killer);
                }

                if (v.result === "victory") {
                    victories[labels.indexOf(v.killer)] = victories[labels.indexOf(v.killer)] ? victories[0] + 1 : 1;
                }

                if (v.result === "defeat") {
                    defeats[labels.indexOf(v.killer)] = defeats[labels.indexOf(v.killer)] ? defeats[0] + 1 : 1;
                }
            });
        }

        return {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Victory',
                    backgroundColor: '#c8e6c9',
                    data: victories
                },
                {
                    type: 'bar',
                    label: 'Defeat',
                    backgroundColor: '#ffcdd2',
                    data: defeats
                }
            ]
        }
    }
}
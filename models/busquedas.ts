import axios from 'axios';
class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Jose']

    constructor() {

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        // petición http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get('/')
            console.log(resp.data);
            return [] // retorna todos los lugares que coincidan

        } catch (error) {
            return []
        }
    }
}

export { Busquedas }
import axios from 'axios';
class Busquedas {

    historial = ['Tegucigalpa','Madrid','San Jose']

    constructor() {

    }

    async ciudad (lugar = '') {
        // petición http
        try {
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Santiago.json?access_token=pk.eyJ1IjoicGVkcm8xNTA5IiwiYSI6ImNrbmNibXlmYzE5OXMycHBqcGliZW9nam4ifQ.HWFMtSi36D0bnCb6fLzOtw&limit=5&language=es')
            console.log(resp.data);
            return [] // retorna todos los lugares que coincidan
            
        } catch (error) {
            return []            
        }
    }
}

export {Busquedas}
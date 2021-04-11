import fs from 'fs'
import axios from 'axios';
class Busquedas {

    historial:Array<any> = []
    pathDB = './db/lugares.json'

    constructor() {

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric'
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
            // console.log(resp.data.features);
            return resp.data.features.map((lugar: any) => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })) // retorna todos los lugares que coincidan

        } catch (error) {
            return []
        }
    }

    async climaLugar(lat: any, lon: any) {
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramWeather, lat, lon }
            })

            const result = await instance.get('/')
            const { weather, main } = result.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
        return null

    }

    guardarDB(lugar = '') {
        if (!this.historial.includes(lugar)) {
            this.historial = this.historial.slice(0,5)
            this.historial.unshift(lugar)
            fs.writeFileSync(this.pathDB, JSON.stringify(this.historial))
        }

    }

    leerDB() {
        const db:any = fs.readFileSync(this.pathDB)
        this.historial = JSON.parse(db)
    }

    listarLugares() {
        this.historial.forEach((lugar, key) => {
            const idx = `${key + 1}.`.green
            console.log(`${idx} ${lugar}`);

        })
    }

}

export { Busquedas }
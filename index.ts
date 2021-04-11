require('dotenv').config()
require('colors')
import axios from 'axios';
import { inquirerMenu, leerInput, Listarlugares, pausa } from './helpers/inquirer';
import { Busquedas } from './models/busquedas';

const main = async () => {

    let opt: number
    const busqueda = new Busquedas()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese Ciudad:')
                const lugares:Array<any> = await busqueda.ciudad(lugar)
                const lugarSeleccionado = await Listarlugares(lugares)
                if (lugarSeleccionado !== 0) {
                    const infoLugar = lugares.find(lugar => lugar.id === lugarSeleccionado)
                    const {nombre, lng,lat} = infoLugar

                    const clima = await busqueda.climaLugar(lat,lng)
                    
                    if (clima) {
                        console.clear();
                        console.log('\nInformación de la ciudad\n'.green)
                        console.log('Ciudad:',nombre.green)
                        console.log('Descripción:', clima.desc.green)
                        console.log('Temperatura:', clima.temp)
                        console.log('Minima:', clima.min)
                        console.log('Maxima:', clima.max)
                        console.log('Lat:',lat)
                        console.log('Lng:',lng)
                    }
                    
                }

                
                break;
        }

        await pausa();
    } while (opt !== 0);


}

main()
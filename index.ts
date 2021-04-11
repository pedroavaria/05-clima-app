require('dotenv').config
require('colors')
import axios from 'axios';
import { inquirerMenu, leerInput, pausa } from './helpers/inquirer';
import { Busquedas } from './models/busquedas';



const main = async () => {

    let opt: number
    const busqueda = new Busquedas()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ingrese Ciudad:')
                await busqueda.ciudad(lugar)
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperatura: ', );
                console.log('Minima: ', );
                console.log('Maxima: ', );
                
                break;
        }

        await pausa();
    } while (opt !== 0);


}

main()
require('colors')
import * as color from 'colors'
import { inquirerMenu, leerInput, pausa } from './helpers/inquirer';
console.log('Hola Mundo'.green);

const main = async () => {
    let opt: number
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                const ciudad = await leerInput('Ingrese Ciudad:')
                console.log(ciudad);
                
                break;
        }

        await pausa();
    } while (opt !== 0);


}

main()
// import { useState, useEffect } from 'react';
import { destroyer, submarine, cruiser, battleship } from '../components/randomizeShips';

export const checkArrayOfIds = (id) => {
    if(destroyer.includes(id)) {
        destroyer.splice(destroyer.indexOf(id), 1)
        console.log('destroyer after splice: ', destroyer)
    }
    if(submarine.includes(id)) {
        submarine.splice(submarine.indexOf(id), 1)
        console.log('submarine after splice: ', submarine)
    }
    if(cruiser.includes(id)) {
        cruiser.splice(cruiser.indexOf(id), 1)
        console.log('cruiser after splice: ', cruiser)
    }
    if(battleship.includes(id)) {
        battleship.splice(battleship.indexOf(id), 1)
        console.log('battleship after splice: ', battleship)
    }
}
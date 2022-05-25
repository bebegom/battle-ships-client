// import { useState, useEffect } from 'react';
import { myShips } from '../components/randomizeShips';

export const checkArrayOfIds = (id) => {
    if(myShips[0] && myShips[0].includes(id)) {
        // myShips[0].splice(myShips[0].indexOf(id), 1)
        myShips[0] = myShips[0].filter( index => index !== id )
    } 
     if (myShips[1] && myShips[1].includes(id)) {
        // myShips[1].splice(myShips[0].indexOf(id), 1)
        myShips[1] = myShips[1].filter( index => index !== id )
    } 
     if ( myShips[2] && myShips[2].includes(id)) {
        // myShips[2].splice(myShips[0].indexOf(id), 1)
        myShips[2] = myShips[2].filter( index => index !== id )
    } 
     if (myShips[3] && myShips[3].includes(id)) {
        // myShips[3].splice(myShips[0].indexOf(id), 1)
        myShips[3] = myShips[3].filter( index => index !== id )
    }
}
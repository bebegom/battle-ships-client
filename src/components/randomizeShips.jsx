import {getDestroyerLocation, getSubmarineLocation, getCruiserLocation, getBattleshipLocation} from '../helpers/GetShips'
import {getObj} from '../helpers/GetObj'

let destroyer;
let submarine;
let cruiser;
let battleship;
let myShips;

const randomizeShips = (myArray) => {
    // get a random position for Destroyer (small) 
    const randomizeDestroyerLocation = () => {

        let [id, id2] = getDestroyerLocation()

        const obj1 = getObj(myArray, id)
        const obj2 = getObj(myArray, id2)

        if (obj1.ship || obj2.ship) {
            [id, id2] = getDestroyerLocation()
        }

        obj1.ship = true
        obj2.ship = true

        destroyer = [id, id2]

        return [id, id2]

    }

    // get a random position for Submarine (small) 
    const randomizeSubmarineLocation = () => {

        let [id, id2] = getSubmarineLocation()

        const obj1 = getObj(myArray, id)
        const obj2 = getObj(myArray, id2)

        if (obj1.ship || obj2.ship) {
            [id, id2] = getSubmarineLocation()
        }

        obj1.ship = true
        obj2.ship = true

        submarine = [id, id2]

        return [id, id2]
    }

   // get a random position for Cruiser (medium) 
    const randomizeCruiserLocation = () => {

        let [id, id2, id3] = getCruiserLocation()

        const obj1 = getObj(myArray, id)
        const obj2 = getObj(myArray, id2)
        const obj3 = getObj(myArray, id3)

        if (obj1.ship || obj2.ship || obj3.ship) {
            [id, id2, id3] = getCruiserLocation()
        }

        obj1.ship = true
        obj2.ship = true
        obj3.ship = true

        cruiser = [id, id2, id3]

        return [id, id2, id3]

   }

    // get a random position for Battleship (large) 
    const randomizeBattlehipLocation = () => {

        let [id, id2, id3, id4] = getBattleshipLocation()

        console.log(id, id2, id3, id4)

        const obj1 = getObj(myArray, id)
        const obj2 = getObj(myArray, id2)
        const obj3 = getObj(myArray, id3)
        const obj4 = getObj(myArray, id4)

        if (obj1.ship || obj2.ship || obj3.ship || obj4.ship) {
            [id, id2, id3, id4] = getBattleshipLocation()
        }

        obj1.ship = true
        obj2.ship = true
        obj3.ship = true
        obj4.ship = true

        battleship = [id, id2, id3, id4]

        return [id, id2, id3, id4]
    }

    randomizeBattlehipLocation()
    randomizeCruiserLocation()
    randomizeSubmarineLocation()
    randomizeDestroyerLocation()

    myShips = [battleship, cruiser, submarine, destroyer]
}

export {
    randomizeShips,
    destroyer,
    submarine,
    cruiser,
    battleship,
    myShips,
}
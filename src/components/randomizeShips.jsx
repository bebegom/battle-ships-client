import { getDestroyerLocation, getSubmarineLocation, getCruiserLocation, getBattleshipLocation } from '../helpers/GetShips'

let destroyer;
let submarine;
let cruiser;
let battleship;
let myShips;

const randomizeShips = () => {
    // get a random position for Destroyer (small) 
    const randomizeDestroyerLocation = (ship, ship2) => {
        [ship, ship2] = getDestroyerLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getDestroyerLocation()
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')
        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        destroyer = [ship, ship2]
    }

    // get a random position for Submarine (small) 
    const randomizeSubmarineLocation = (ship, ship2) => {
        [ship, ship2] = getSubmarineLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getSubmarineLocation()
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        submarine = [ship, ship2]
    }

   // get a random position for Cruiser (medium) 
    const randomizeCruiserLocation = (ship, ship2, ship3) => {
        [ship, ship2, ship3] = getCruiserLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship') || document.getElementById(ship3).classList.contains('ship'); i++) {
            [ship, ship2, ship3] = getCruiserLocation()
        }

       document.getElementById(ship).classList.add('ship')
       document.getElementById(ship).classList.remove('box')

       document.getElementById(ship2).classList.add('ship')
       document.getElementById(ship2).classList.remove('box')

       document.getElementById(ship3).classList.add('ship')
       document.getElementById(ship3).classList.remove('box')
       
       cruiser = [ship, ship2, ship3]
   }

   // get a random position for Battleship (large) 
   const randomizeBattlehipLocation = (ship, ship2, ship3, ship4) => {
        [ship, ship2, ship3, ship4] = getBattleshipLocation()

        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')

        document.getElementById(ship3).classList.add('ship')
        document.getElementById(ship3).classList.remove('box')

        document.getElementById(ship4).classList.add('ship')
        document.getElementById(ship4).classList.remove('box')

        battleship = [ship, ship2, ship3, ship4]
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
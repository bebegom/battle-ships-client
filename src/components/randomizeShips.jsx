import {getDestroyerLocation, getSubmarineLocation, getCruiserLocation, getBattleshipLocation} from '../helpers/GetShips'


const randomizeShips = () => {
    // get a random position for Destroyer (small) 
    const randomizeDestroyerLocation = (ship, ship2) => {

        [ship, ship2] = getDestroyerLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getDestroyerLocation()
            console.log('the if-statment ran for small ship, i: ', i)
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')
        console.log('ship', ship, ship2);
    }

    // get a random position for Submarine (small) 
    const randomizeSubmarineLocation = (ship, ship2) => {

        [ship, ship2] = getSubmarineLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship'); i++) {
            [ship, ship2] = getSubmarineLocation()
            console.log('the if-statment ran for small ship, i: ', i)
        }
    
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')
        console.log('ship', ship, ship2);
    }

   // get a random position for Cruiser (medium) 
    const randomizeCruiserLocation = (ship, ship2, ship3) => {

        [ship, ship2, ship3] = getCruiserLocation()

        for (let i = 0; document.getElementById(ship).classList.contains('ship') || document.getElementById(ship2).classList.contains('ship') || document.getElementById(ship3).classList.contains('ship'); i++) {
            [ship, ship2, ship3] = getCruiserLocation()
            console.log('the if-statment ran for medium ship, i: ', i)
        }

       document.getElementById(ship).classList.add('ship')
       document.getElementById(ship).classList.remove('box')

       document.getElementById(ship2).classList.add('ship')
       document.getElementById(ship2).classList.remove('box')

       document.getElementById(ship3).classList.add('ship')
       document.getElementById(ship3).classList.remove('box')
       console.log('ship', ship, ship2, ship3);

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
        console.log('ship', ship, ship2, ship3, ship4);
    }

randomizeBattlehipLocation('shipFour','shipFour2','shipFour3','shipFour4')
randomizeCruiserLocation('shipThree','shipThree2','shipThree3')
randomizeSubmarineLocation('shipOne', 'shipOne2')
randomizeDestroyerLocation('shipTwo', 'shipTwo2')
}

export default randomizeShips
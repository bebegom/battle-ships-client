const numberToLetter = {0:'a', 1: 'b', 2: 'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h', 8:'i', 9:'j'}

export const getSmallShipLocation = () => {
    let x = Math.floor(Math.random() * 10) + 1
    let y = Math.floor(Math.random() * 10)
    y = Object.values(numberToLetter[y])
    const id = y+x
    let nextId;
    if(x === 1 ) {
        x = x+1
        nextId = y+x
    } else if (x === 10) {
        x = x-1
        nextId = y+x
    } else if (x > 1 && x <10) {
        x = x+1
        nextId = y+x
    }

    const ship = [id, nextId]
    return ship
}

export const getMediumShipLocation = () => {
    let x = Math.floor(Math.random() * 10) + 1
    let y = Math.floor(Math.random() * 10)
    y = Object.values(numberToLetter[y])
    const id = y+x
    let nextId;
    let thirdId;
    if(x === 1) {
        x = x+1
        nextId = y+x
        x = x+1
        thirdId = y+x
    } else if (x === 10 || x === 9) {
        x = x-1
        nextId = y+x
        x = x-1
        thirdId = y+x
    } else if (x > 1 && x <9) {
        x = x+1
        nextId = y+x
        x = x+1
        thirdId = y+x
    }

    const ship = [id, nextId, thirdId]
    return ship
}

export const getLargeShipLocation = () => {
    let x = Math.floor(Math.random() * 10) + 1
    let y = Math.floor(Math.random() * 10)
    y = Object.values(numberToLetter[y])
    const id = y+x
    let nextId;
    let thirdId;
    let fourthId;
    if(x === 1) {
        x = x+1
        nextId = y+x
        x = x+1
        thirdId = y+x
        x = x+1 
        fourthId = y+x
    } else if (x === 10 || x === 9 || x === 8) {
        x = x-1
        nextId = y+x
        x = x-1
        thirdId = y+x
        x = x-1 
        fourthId = y+x
    } else if (x > 1 && x <8) {
        x = x+1
        nextId = y+x
        x = x+1
        thirdId = y+x
        x = x+1 
        fourthId = y+x
    }

    const ship = [id, nextId, thirdId, fourthId]
    return ship
}
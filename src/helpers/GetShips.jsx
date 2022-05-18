export const getShipLocation = () => {
    const numberToLetter = {0:'a', 1: 'b', 2: 'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h', 8:'i', 9:'j'}
    let x = Math.floor(Math.random() * 10) + 1
    let y = Math.floor(Math.random() * 10)
    y = Object.values(numberToLetter[y])
    const id = y+x
    let nextid;
    if(x === 1 ) {
        x = x+1
        nextid = y+x
    } else if (x === 10) {
        x = x-1
        nextid = y+x
    } else if (x > 1 && x <10) {
        x = x+1
        nextid = y+x
    }
    // else if(y === 1 ) {
    //     y = y+1
    //     nextid = y+x
    // } else if (y === 10) {
    //     y = y-1
    //     nextid = y+x
    // }>>

    const ship = [id, nextid]
    return ship
}

const randomPlayerStart = () => {
    const randomNumber = (max) => {
        return Math.floor(Math.random() * max)
    }

    if (randomNumber(11) <= 5) {
        //player one start
    } else {
        //player two start
    }
}



export default randomPlayerStart;
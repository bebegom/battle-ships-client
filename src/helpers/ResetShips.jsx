
export const resetShips = () => {

    const ship = document.querySelectorAll('.ship')
    const hit = document.querySelectorAll('.hit')
    const miss = document.querySelectorAll('.miss')
    const disabled = document.querySelectorAll('.disabledBox')

    ship.classList.add('.box').remove('.ship', '.hit', '.miss', '.disabledBox')
    hit.classList.add('.box').remove('.ship', '.hit', '.miss', '.disabledBox')
    miss.classList.add('.box').remove('.ship', '.hit', '.miss', '.disabledBox')
    disabled.classList.add('.box').remove('.ship', '.hit', '.miss', '.disabledBox')
    
}
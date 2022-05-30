
export const resetShips = () => {

    document.querySelectorAll('div.ship').forEach(div => {
        div.classList.add('box')
        div.classList.remove('ship')
    })

    document.querySelectorAll('div.hit').forEach(div => {
        div.classList.add('box')
        div.classList.remove('hit')
    })

    document.querySelectorAll('div.miss').forEach(div => {
        div.classList.add('box')
        div.classList.remove('miss')
    })

    document.querySelectorAll('div.disabledBox').forEach(div => {
        div.classList.add('box')
        div.classList.remove('disabledBox')
    })
    
}
// React & sound
import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import hitSound from '../assets/audio/hit.wav'
import missSound from '../assets/audio/miss.wav'


// Components & helpers
import MyBattleboard from '../components/MyBattleboard';
import OpponentBattleboard from '../components/OpponentBattleboard';
import {randomizeShips, myShips} from '../components/randomizeShips';
import {checkArrayOfIds} from '../helpers/HPSplicer'
import {resetShips} from '../helpers/ResetShips'

const GameboardPage = ({ socket }) => {
    const [myTurn, setMyTurn] = useState(false)
	const [shipsLeft, setShipsLeft] = useState(4)
    const [opponentAmountOfShips, setOpponentAmountOfShips] = useState(4)

	const [playHitSound] = useSound(hitSound, { volume: 0.10 })
	const [playMissSound] = useSound(missSound, { volume: 0.30 })

	const handleClickedOnBox = (e) => {
		if (!e.target.classList.contains('disabledBox')) {
			e.target.classList.add('disabledBox')
			e.target.classList.remove('box')

			// emit till servern och fråga om det är en träff
			const id = e.target.id;
			socket.emit('user:click', socket.id, id)

			// Nästa spelares tur
			setMyTurn(false)
		}
	}


	useEffect(() => {
		socket.on("game:start", () => {
			randomizeShips()
		})

		// listen to if you start
		socket.on("game:playerTurn", () => {
			setMyTurn(true)
		} )

		// listen to if other player starts
		socket.on("game:playerWaiting", () => {
			setMyTurn(false)
		})

		// listen to handle hit check
		socket.on('user:hitormiss', (socketId, boxId) => {
			// check if hit or miss
			let hit = false

			const currentBox = document.querySelector(`#${boxId}`);
			if (currentBox.classList.contains('ship')) {
				hit = true

				// ta bort id:et från array med ship-positions
				checkArrayOfIds(boxId)

				// om en array är tom, minska myAmountOfShips
				const checkIfShipSunk = () => {
					if (myShips[0].length === 0) {
						myShips[0] = false
						socket.emit('send:ship:sunk:to:opponent', socketId)
					} 
					if(myShips[1].length===0) {
						myShips[1] = false
						socket.emit('send:ship:sunk:to:opponent', socketId)
					}
					if(myShips[2].length===0) {
						myShips[2] = false
						socket.emit('send:ship:sunk:to:opponent', socketId)
					}
					if(myShips[3].length===0) {
						myShips[3] = false
						socket.emit('send:ship:sunk:to:opponent', socketId)
					}
				}
				checkIfShipSunk()
			}
			// emit respons
			socket.emit('click:response', socketId, boxId, hit)
		})

		socket.on("opponentClick:respons", (socketId, boxId, hit) => {
			const currentBox = document.querySelector(`#${boxId}`);

			if (hit) {
				currentBox.classList.remove('box')
				currentBox.classList.add('hit')

			} else {
				currentBox.classList.remove('box')
				currentBox.classList.add('miss')
			}
		})

		socket.on('sending:ship:sunk:to:opponent', () => {
			setOpponentAmountOfShips(prevvalue => prevvalue - 1)
		})

		socket.on('your:ship:sunk', (socketId) => {
			const trueArr = myShips.filter(index => index)
			if(trueArr.length === 0) {
				console.log('you lost! ')
				// send to server that opponent won
				socket.emit('player:has:no:ships:left', socketId)
			}
			setShipsLeft(trueArr.length)
		})

		socket.on('reset:ships', () => {
			setOpponentAmountOfShips(4)
			setShipsLeft(4)
			resetShips()
		})

		socket.on("reset:opponent:left:game", () => {
			setOpponentAmountOfShips(4)
			setShipsLeft(4)
			resetShips()
			socket.emit("opponent:left", socket.id)
		})
	}, [socket])

	useEffect(() => {
		// listen to hit check respons
		socket.on("response:hitormiss", (socketId, boxId, hit) => {

			const orBoxId = "o" + boxId;
			const currentDiv = document.querySelector(`#${orBoxId}`);

			currentDiv.classList.remove('disabledbox');
		
			if (hit) {
				currentDiv.classList.add('hit')
				playHitSound()
			} else {
				currentDiv.classList.add('miss')
				playMissSound()
			}
			// next players turn
			socket.emit('game:nextPlayer', socketId)
		})
	}, [socket, playHitSound, playMissSound])

	return (

		<>
			<h1>Battleships Anno 2830</h1>
			{/********* Gameboard  vertical - A-J     Horisont - 1-10 ********/}
				<div className="gameboard">
					<div id='mySide'>
						<div id='myShipsCount' className='scoreboard'>
							<h2 className={myTurn ? 'playersTurn' : ''}>You</h2> 
							Spaceships I have left: {shipsLeft}
						</div>

						<MyBattleboard />

					</div>
					{/********* / Gameboard ********/}


					{/********* opponent's board ********/}
					<div id='opponentSide'>
						<div className='scoreboard'>
							<h2 className={myTurn ? '' : 'playersTurn'}>The Enemy</h2>
							Enemy spaceships left: {opponentAmountOfShips}
						</div>
						
						<OpponentBattleboard onClick={handleClickedOnBox} myTurn={myTurn} />

					</div>
				{/********* / opponent's board ********/}
		   </div>
		</>
	)
}

export default GameboardPage
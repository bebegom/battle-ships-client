// React & sound
import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import hitSound from '../assets/audio/hit.wav'
import missSound from '../assets/audio/miss.wav'


// Components & helpers
import {randomizeShips, myShips} from '../components/randomizeShips';
import {checkArrayOfIds} from '../helpers/HPSplicer'
import {resetShips} from '../helpers/ResetShips'
import {uniqueId} from '../helpers/uniqueId'
import {getObj} from '../helpers/GetObj'


// import { uniqueId } from "../helpers/uniqueId"
// import MyBattleboard from '../components/MyBattleboard';
// import OpponentBattleboard from '../components/OpponentBattleboard';

const myArray = []

const oppArray = []

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', ]
const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function generateBoards() {

	letters.forEach(letter => {
		const row = [];

		for (let i = 0; i < num.length; i++) {
			const id = letter + num[i].toString();
			row.push(
				{ 
					'id':  id,
					'hit': false,
					'miss': false,
					'ship': false,
					'disabledBox': false,
					'box': true
				},
			)
		} 
		myArray.push(row)
	})

	randomizeShips(myArray)

	letters.forEach(letter => {
		const row = [];
		for (let i = 0; i < num.length; i++) {
			const id = 'o' + letter + num[i].toString();
			row.push(
				{ 
					'id':  id,
					'hit': false,
					'miss': false,
					'ship': false,
					'disabledBox': false,
					'box': true
				},
			)
		} 
		oppArray.push(row)
	})
}


const GameboardPage = ({ socket }) => {
    const [myTurn, setMyTurn] = useState(false)
	const [shipsLeft, setShipsLeft] = useState(4)
    const [opponentAmountOfShips, setOpponentAmountOfShips] = useState(4)

	const [playHitSound] = useSound(hitSound, { volume: 0.10 })
	const [playMissSound] = useSound(missSound, { volume: 0.30 })


	const handleClickedOnBox = (e) => {
		const targetObj = getObj(oppArray, e.target.id)
		if (!targetObj.disabledBox) {
			
			targetObj.disabledBox = true
			targetObj.box = false

			// emit till servern och fråga om det är en träff
			socket.emit('user:click', socket.id, e.target.id)

			// Nästa spelares tur
			setMyTurn(false)
		}
	}

	useEffect(() => {
		// listen to if game starts
		socket.on("game:start", () => {
			generateBoards()
			randomizeShips(myArray)
		})
	}, [socket])



	useEffect(() => {
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
			let hit = false;
			const obj = getObj(myArray, boxId)

			if (obj.ship) {	
				// change hit to true, so it can be sent to opponent
				hit = true;
				// remove id from array with ship positions
				checkArrayOfIds(boxId)	
				// if an array is empty decrease myAmountOfShips
				const checkIfShipSunk = () => {
					if (myShips[0].length === 0) {
						myShips[0] = false
						// console.log('shipsLeft: ', shipsLeft)
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
			socket.emit('click:response', socketId, boxId, hit)
		})

		socket.on("opponentClick:respons", (socketId, boxId, hit) => {
			console.log("boxId", boxId)
			const obj = getObj(myArray, boxId)

			if (hit) {
				obj.box = false
				obj.hit = true
			} else {
				obj.box = false
				obj.miss = true
			}
		})

		socket.on('sending:ship:sunk:to:opponent', () => {
			setOpponentAmountOfShips(prevvalue => prevvalue - 1)
		})

		socket.on('your:ship:sunk', (socketId) => {
			const trueArr = myShips.filter(index => index)

			if(trueArr.length === 0) {
				// send to server that opponent won
				socket.emit('player:has:no:ships:left', socketId)
			}
			// decrease your num of ships
			setShipsLeft(trueArr.length)
		})

		socket.on('reset:ships', () => {
			// reset amount of ships and position of ships
			setOpponentAmountOfShips(4)
			setShipsLeft(4)
			resetShips()
		})

		socket.on("reset:opponent:left:game", () => {
			// reset amount of ships and position of ships
			setOpponentAmountOfShips(4)
			setShipsLeft(4)
			resetShips()
			// alert("your enemy fled in terror")
			socket.emit("opponent:left", socket.id)
		})

	}, [socket])


	
	useEffect(() => {
				// listen to hit check respons
				socket.on("response:hitormiss", (socketId, boxId, hit) => {
					const oppBoxId = "o" + boxId;
					const obj = getObj(oppArray, oppBoxId)
					obj.disabledBox = true
					if (hit) {
						obj.hit = true
						playHitSound()
					} else {
						obj.miss = true
						playMissSound()
					}
					
					// next players turn?
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
						<h2 className={myTurn ? 'playersTurn' : ''}>You</h2> {/* if-statment- if it is my turn give this .playersTurn */}
						Spaceships I have left: {shipsLeft}
					</div>
					<div  className="gameboard-wapper">

						{
							myArray.map( row =>
								<div className='row' key={uniqueId()}>
									{row.map( obj => {
										return(
											<div 
												id={obj.id} 
												className={
													`${obj.hit ? "hit" : ""} ${obj.miss ? "miss" : ""} ${obj.ship ? "ship" : ""} ${obj.box ? "box" : ""}`
												}
												key={uniqueId()} 
											>{obj.id}</div>
										)
									})}
								</div>
							)
						}

					</div>
				</div>
			{/********* / Gameboard ********/}


			{/********* opponent's board ********/}
			<div id='opponentSide'>
				<div className='scoreboard'>
					<h2 className={myTurn ? '' : 'playersTurn'}>The Enemy</h2> {/* if-statment- if it is opponent's turn give this .playersTurn */}
						Enemy paceships left: {opponentAmountOfShips}
				</div>
					<div className="gameboard-wrapper">

						{/* <OpponentBattleboard oppArray={oppArray} myTurn={myTurn} onClick={handleClickedOnBox} /> */}

					{
						oppArray.map(row => 
							<div className='row' key={uniqueId()}>
								{row.map( obj => {
									return(
										<div 
											onClick={e => {
												if (myTurn) {handleClickedOnBox(e)}
											}} 
											id={obj.id}
											className={
												`${obj.hit ? "hit" : ""} ${obj.miss ? "miss" : ""} ${obj.box ? "box" : ""}`
											}
											key={uniqueId()}
										>{obj.id.substring(1)}</div>
									)
								})}
							</div>
						)
					}

					</div>
				</div>
				{/********* / opponent's board ********/}
			</div>
		</>














		// <>
		// 	<h1>Battleships Anno 2830</h1>
		// 	{/********* Gameboard  vertical - A-J     Horisont - 1-10 ********/}
		//    <div className="gameboard">
		// 		<div id='mySide'>
		// 			<div id='myShipsCount' className='scoreboard'>
		// 				<h2 className={myTurn ? 'playersTurn' : ''}>You</h2> {/* if-statment- if it is my turn give this .playersTurn */}
		// 				Spaceships I have left: {shipsLeft}
		// 			</div>
		// 			<div className="gameboard-wapper">

		// 						<div className='row'>
		// 							<div id='a1' className="box">A1</div>
		// 							<div id='a2' className="box">A2</div>
		// 							<div id='a3' className="box">A3</div>
		// 							<div id='a4' className="box">A4</div>
		// 							<div id='a5' className="box">A5</div>
		// 							<div id='a6' className="box">A6</div>
		// 							<div id='a7' className="box">A7</div>
		// 							<div id='a8' className="box">A8</div>
		// 							<div id='a9' className="box">A9</div>
		// 							<div id='a10' className="box">A10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='b1' className="box">B1</div>
		// 							<div id='b2' className="box">B2</div>
		// 							<div id='b3' className="box">B3</div>
		// 							<div id='b4' className="box">B4</div>
		// 							<div id='b5' className="box">B5</div>
		// 							<div id='b6' className="box">B6</div>
		// 							<div id='b7' className="box">B7</div>
		// 							<div id='b8' className="box">B8</div>
		// 							<div id='b9' className="box">B9</div>
		// 							<div id='b10' className="box">B10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='c1' className="box">C1</div>
		// 							<div id='c2' className="box">C2</div>
		// 							<div id='c3' className="box">C3</div>
		// 							<div id='c4' className="box">C4</div>
		// 							<div id='c5' className="box">C5</div>
		// 							<div id='c6' className="box">C6</div>
		// 							<div id='c7' className="box">C7</div>
		// 							<div id='c8' className="box">C8</div>
		// 							<div id='c9' className="box">C9</div>
		// 							<div id='c10' className="box">C10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='d1' className="box">D1</div>
		// 							<div id='d2' className="box">D2</div>
		// 							<div id='d3' className="box">D3</div>
		// 							<div id='d4' className="box">D4</div>
		// 							<div id='d5' className="box">D5</div>
		// 							<div id='d6' className="box">D6</div>
		// 							<div id='d7' className="box">D7</div>
		// 							<div id='d8' className="box">D8</div>
		// 							<div id='d9' className="box">D9</div>
		// 							<div id='d10' className="box">D10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='e1' className="box">E1</div>
		// 							<div id='e2' className="box">E2</div>
		// 							<div id='e3' className="box">E3</div>
		// 							<div id='e4' className="box">E4</div>
		// 							<div id='e5' className="box">E5</div>
		// 							<div id='e6' className="box">E6</div>
		// 							<div id='e7' className="box">E7</div>
		// 							<div id='e8' className="box">E8</div>
		// 							<div id='e9' className="box">E9</div>
		// 							<div id='e10' className="box">E10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='f1' className="box">F1</div>
		// 							<div id='f2' className="box">F2</div>
		// 							<div id='f3' className="box">F3</div>
		// 							<div id='f4' className="box">F4</div>
		// 							<div id='f5' className="box">F5</div>
		// 							<div id='f6' className="box">F6</div>
		// 							<div id='f7' className="box">F7</div>
		// 							<div id='f8' className="box">F8</div>
		// 							<div id='f9' className="box">F9</div>
		// 							<div id='f10' className="box">F10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='g1' className="box">G1</div>
		// 							<div id='g2' className="box">G2</div>
		// 							<div id='g3' className="box">G3</div>
		// 							<div id='g4' className="box">G4</div>
		// 							<div id='g5' className="box">G5</div>
		// 							<div id='g6' className="box">G6</div>
		// 							<div id='g7' className="box">G7</div>
		// 							<div id='g8' className="box">G8</div>
		// 							<div id='g9' className="box">G9</div>
		// 							<div id='g10' className="box">G10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='h1' className="box">H1</div>
		// 							<div id='h2' className="box">H2</div>
		// 							<div id='h3' className="box">H3</div>
		// 							<div id='h4' className="box">H4</div>
		// 							<div id='h5' className="box">H5</div>
		// 							<div id='h6' className="box">H6</div>
		// 							<div id='h7' className="box">H7</div>
		// 							<div id='h8' className="box">H8</div>
		// 							<div id='h9' className="box">H9</div>
		// 							<div id='h10' className="box">H10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='i1' className="box">I1</div>
		// 							<div id='i2' className="box">I2</div>
		// 							<div id='i3' className="box">I3</div>
		// 							<div id='i4' className="box">I4</div>
		// 							<div id='i5' className="box">I5</div>
		// 							<div id='i6' className="box">I6</div>
		// 							<div id='i7' className="box">I7</div>
		// 							<div id='i8' className="box">I8</div>
		// 							<div id='i9' className="box">I9</div>
		// 							<div id='i10' className="box">I10</div>
		// 						</div>
		// 						<div className='row'>
		// 							<div id='j1' className="box">J1</div>
		// 							<div id='j2' className="box">J2</div>
		// 							<div id='j3' className="box">J3</div>
		// 							<div id='j4' className="box">J4</div>
		// 							<div id='j5' className="box">J5</div>
		// 							<div id='j6' className="box">J6</div>
		// 							<div id='j7' className="box">J7</div>
		// 							<div id='j8' className="box">J8</div>
		// 							<div id='j9' className="box">J9</div>
		// 							<div id='j10' className="box">J10</div>
		// 						</div>
		// 			</div>
		// 		</div>
		// 		{/********* / Gameboard ********/}

		// 		{/********* opponent's board ********/}
		// 			<div id='opponentSide'>
		// 				<div className='scoreboard'>
		// 					<h2 className={myTurn ? '' : 'playersTurn'}>The Enemy</h2> {/* if-statment- if it is opponent's turn give this .playersTurn */}
		// 					Enemy spaceships left: {opponentAmountOfShips}
		// 				</div>
		// 				<div className="gameboard-wrapper">
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa1' className="box">A1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa2' className="box">A2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa3' className="box">A3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa4' className="box">A4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa5' className="box">A5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa6' className="box">A6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa7' className="box">A7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa8' className="box">A8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa9' className="box">A9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oa10' className="box">A10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob1' className="box">B1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob2' className="box">B2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob3' className="box">B3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob4' className="box">B4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob5' className="box">B5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob6' className="box">B6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob7' className="box">B7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob8' className="box">B8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='ob9' className="box">B9</div>
		// 						<div 
		// 							onClick={(e) => {
		// 								if (myTurn) {
		// 									handleClickedOnBox(e)
		// 								}
		// 							}} 
		// 							id='ob10' className="box"
		// 						>B10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc1' className="box">C1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc2' className="box">C2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc3' className="box">C3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc4' className="box">C4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc5' className="box">C5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc6' className="box">C6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc7' className="box">C7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc8' className="box">C8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc9' className="box">C9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oc10' className="box">C10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od1' className="box">D1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od2' className="box">D2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od3' className="box">D3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od4' className="box">D4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od5' className="box">D5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od6' className="box">D6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od7' className="box">D7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od8' className="box">D8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od9' className="box">D9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='od10' className="box">D10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe1' className="box">E1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe2' className="box">E2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe3' className="box">E3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe4' className="box">E4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe5' className="box">E5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe6' className="box">E6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe7' className="box">E7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe8' className="box">E8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe9' className="box">E9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oe10' className="box">E10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of1' className="box">F1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of2' className="box">F2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of3' className="box">F3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of4' className="box">F4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of5' className="box">F5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of6' className="box">F6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of7' className="box">F7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of8' className="box">F8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of9' className="box">F9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='of10' className="box">F10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og1' className="box">G1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og2' className="box">G2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og3' className="box">G3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og4' className="box">G4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og5' className="box">G5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og6' className="box">G6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og7' className="box">G7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og8' className="box">G8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og9' className="box">G9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='og10' className="box">G10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh1' className="box">H1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh2' className="box">H2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh3' className="box">H3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh4' className="box">H4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh5' className="box">H5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh6' className="box">H6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh7' className="box">H7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh8' className="box">H8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh9' className="box">H9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oh10' className="box">H10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi1' className="box">I1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi2' className="box">I2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi3' className="box">I3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi4' className="box">I4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi5' className="box">I5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi6' className="box">I6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi7' className="box">I7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi8' className="box">I8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi9' className="box">I9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oi10' className="box">I10</div>
		// 					</div>
		// 					<div className='row'>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj1' className="box">J1</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj2' className="box">J2</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj3' className="box">J3</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj4' className="box">J4</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj5' className="box">J5</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj6' className="box">J6</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj7' className="box">J7</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj8' className="box">J8</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj9' className="box">J9</div>
		// 						<div onClick={(e) => {
		// 							if (myTurn) {
		// 								handleClickedOnBox(e)
		// 							}
		// 						}} id='oj10' className="box">J10</div>
		// 					</div>
		// 				</div>
		// 		</div>
		// 		{/********* / opponent's board ********/}
		//    </div>
		// </>
	)
}

export default GameboardPage
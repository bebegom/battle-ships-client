import React, { useState, useEffect} from 'react'
import {randomizeShips} from '../components/randomizeShips';
import Player from '../components/Player';
import {myShips} from '../components/randomizeShips';
import {checkArrayOfIds} from '../helpers/HPSplicer'

const GameboardPage = ({ socket }) => {
    const [myTurn, setMyTurn] = useState(false)
	// const [amountOfShipsLeft, setAmountOfShipsLeft] = useState(4)
	const [shipsLeft, setShipsLeft] = useState(4)
    const [opponentAmountOfShips, setOpponentAmountOfShips] = useState(4)
	// const [trueIndexes, setTrueIndexes] = useState([[],[],[],[]])
	const [iWon, setIWon] = useState(false)
	const [iLost, setILost] = useState(false)

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
			let hit = false;

			const currentBox = document.querySelector(`#${boxId}`);

			if (currentBox.classList.contains('ship')) {
				// console.log('opponent clicked on:', boxId)

				hit = true;

				// ta bort id:et från array med ship-positions
				checkArrayOfIds(boxId)
				// console.log('myShips efter splicing: ', myShips)

				// TODO:
				// om en array är tom, minska myAmountOfShips
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

		// listen to hit check respons
		socket.on("response:hitormiss", (socketId, boxId, hit) => {

			const orBoxId = "o" + boxId;
			const currentDiv = document.querySelector(`#${orBoxId}`);
			currentDiv.classList.remove('disabledbox');

			if (hit) {
				currentDiv.classList.add('hit')
			} else {
				currentDiv.classList.add('miss')
			}
				
			// next players turn?
			socket.emit('game:nextPlayer', socketId)
		})

		socket.on('sending:ship:sunk:to:opponent', () => {
			setOpponentAmountOfShips(prevvalue => prevvalue - 1)
		})

		socket.on('your:ship:sunk', (opponent) => {
			const trueArr = myShips.filter(index => index)
			if(trueArr.length === 0) {
				console.log('you lost!')
				// send to server that opponent won
				socket.emit('player:has:no:ships:left', opponent)
			}
			setShipsLeft(trueArr.length)
		})

		socket.on('opponent:have:no:ships:left', () => {
			console.log('you win!')
		})

	}, [socket])
	


	return (
		// Spelplan lol
		<>
			{/***   Test för skeppens HP	***/}
			<Player />
			{/***	/Test för skeppens HP	***/}

			{/***   Testknappar för dev		***/}
			<button onClick={()=>{ setMyTurn(!myTurn) }} >turn toggle</button>
			<button onClick={()=>{ socket.emit("reset:room")}} >reset room</button>
			{/***	/Testknappar för dev	***/}

			{/***  Visa component om man vunnit eller förlorat   ***/}
			{/* 
			{ iWon && <component /> }
			{ iLost && <component /> } 
			*/}
			{/***  /Visa component om man vunnit eller förlorat   ***/}


           <h1>Battleship</h1>
           {/********* Gameboard  vertical - A-J     Horisont - 1-10 ********/}
           <div id='mySide'>
                <div className="gameboard-wapper">
                    <button 
					// onClick={()=> {
					// 	randomizeFourShips()
                    // }}
					>get a location</button>
                    <div className='row'>
                        <div id='a1' className="box">a1</div>
                        <div id='a2' className="box">a2</div>
                        <div id='a3' className="box">a3</div>
                        <div id='a4' className="box">a4</div>
                        <div id='a5' className="box">a5</div>
                        <div id='a6' className="box">a6</div>
                        <div id='a7' className="box">a7</div>
                        <div id='a8' className="box">a8</div>
                        <div id='a9' className="box">a9</div>
                        <div id='a10' className="box">a10</div>
                    </div>
                    <div className='row'>
                        <div id='b1' className="box">b1</div>
                        <div id='b2' className="box">b2</div>
                        <div id='b3' className="box">b3</div>
                        <div id='b4' className="box">b4</div>
                        <div id='b5' className="box">b5</div>
                        <div id='b6' className="box">b6</div>
                        <div id='b7' className="box">b7</div>
                        <div id='b8' className="box">b8</div>
                        <div id='b9' className="box">b9</div>
                        <div id='b10' className="box">b10</div>
                    </div>
                    <div className='row'>
                        <div id='c1' className="box">c1</div>
                        <div id='c2' className="box">c2</div>
                        <div id='c3' className="box">c3</div>
                        <div id='c4' className="box">c4</div>
                        <div id='c5' className="box">c5</div>
                        <div id='c6' className="box">c6</div>
                        <div id='c7' className="box">c7</div>
                        <div id='c8' className="box">c8</div>
                        <div id='c9' className="box">c9</div>
                        <div id='c10' className="box">c10</div>
                    </div>
                    <div className='row'>
                        <div id='d1' className="box">d1</div>
                        <div id='d2' className="box">d2</div>
                        <div id='d3' className="box">d3</div>
                        <div id='d4' className="box">d4</div>
                        <div id='d5' className="box">d5</div>
                        <div id='d6' className="box">d6</div>
                        <div id='d7' className="box">d7</div>
                        <div id='d8' className="box">d8</div>
                        <div id='d9' className="box">d9</div>
                        <div id='d10' className="box">d10</div>
                    </div>
                    <div className='row'>
                        <div id='e1' className="box">e1</div>
                        <div id='e2' className="box">e2</div>
                        <div id='e3' className="box">e3</div>
                        <div id='e4' className="box">e4</div>
                        <div id='e5' className="box">e5</div>
                        <div id='e6' className="box">e6</div>
                        <div id='e7' className="box">e7</div>
                        <div id='e8' className="box">e8</div>
                        <div id='e9' className="box">e9</div>
                        <div id='e10' className="box">e10</div>
                    </div>
                    <div className='row'>
                        <div id='f1' className="box">f1</div>
                        <div id='f2' className="box">f2</div>
                        <div id='f3' className="box">f3</div>
                        <div id='f4' className="box">f4</div>
                        <div id='f5' className="box">f5</div>
                        <div id='f6' className="box">f6</div>
                        <div id='f7' className="box">f7</div>
                        <div id='f8' className="box">f8</div>
                        <div id='f9' className="box">f9</div>
                        <div id='f10' className="box">f10</div>
                    </div>
                    <div className='row'>
                        <div id='g1' className="box">g1</div>
                        <div id='g2' className="box">g2</div>
                        <div id='g3' className="box">g3</div>
                        <div id='g4' className="box">g4</div>
                        <div id='g5' className="box">g5</div>
                        <div id='g6' className="box">g6</div>
                        <div id='g7' className="box">g7</div>
                        <div id='g8' className="box">g8</div>
                        <div id='g9' className="box">g9</div>
                        <div id='g10' className="box">g10</div>
                    </div>
                    <div className='row'>
                        <div id='h1' className="box">h1</div>
                        <div id='h2' className="box">h2</div>
                        <div id='h3' className="box">h3</div>
                        <div id='h4' className="box">h4</div>
                        <div id='h5' className="box">h5</div>
                        <div id='h6' className="box">h6</div>
                        <div id='h7' className="box">h7</div>
                        <div id='h8' className="box">h8</div>
                        <div id='h9' className="box">h9</div>
                        <div id='h10' className="box">h10</div>
                    </div>
                    <div className='row'>
                        <div id='i1' className="box">i1</div>
                        <div id='i2' className="box">i2</div>
                        <div id='i3' className="box">i3</div>
                        <div id='i4' className="box">i4</div>
                        <div id='i5' className="box">i5</div>
                        <div id='i6' className="box">i6</div>
                        <div id='i7' className="box">i7</div>
                        <div id='i8' className="box">i8</div>
                        <div id='i9' className="box">i9</div>
                        <div id='i10' className="box">i10</div>
                    </div>
                    <div className='row'>
                        <div id='j1' className="box">j1</div>
                        <div id='j2' className="box">j2</div>
                        <div id='j3' className="box">j3</div>
                        <div id='j4' className="box">j4</div>
                        <div id='j5' className="box">j5</div>
                        <div id='j6' className="box">j6</div>
                        <div id='j7' className="box">j7</div>
                        <div id='j8' className="box">j8</div>
                        <div id='j9' className="box">j9</div>
                        <div id='j10' className="box">j10</div>
                    </div>
                </div>
                <div id='myShipsCount' className='scoreboard'>
                    <h2 className={myTurn ? 'playersTurn' : ''}>You</h2> {/* if-statment- if it is my turn give this .playersTurn */}
                    Amount of ships I have left: {shipsLeft}
                </div>
            </div>
           {/********* / Gameboard ********/}

           {/********* opponent's board ********/}
            <div id='opponentSide'>
                <div className='scoreboard'>
                    <h2 className={myTurn ? '' : 'playersTurn'}>Your opponent</h2> {/* if-statment- if it is opponent's turn give this .playersTurn */}
                    Amount of ships opponent have left: {opponentAmountOfShips}
                </div>
                <div className="gameboard-wrapper">
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa1' className="box">a1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa2' className="box">a2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa3' className="box">a3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa4' className="box">a4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa5' className="box">a5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa6' className="box">a6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa7' className="box">a7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa8' className="box">a8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa9' className="box">a9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oa10' className="box">a10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob1' className="box">b1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob2' className="box">b2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob3' className="box">b3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob4' className="box">b4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob5' className="box">b5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob6' className="box">b6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob7' className="box">b7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob8' className="box">b8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='ob9' className="box">b9</div>
                        <div 
							onClick={(e) => {
								if (myTurn) {
									handleClickedOnBox(e)
								}
							}} 
							id='ob10' className="box"
						>b10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc1' className="box">c1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc2' className="box">c2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc3' className="box">c3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc4' className="box">c4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc5' className="box">c5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc6' className="box">c6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc7' className="box">c7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc8' className="box">c8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc9' className="box">c9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oc10' className="box">c10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od1' className="box">d1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od2' className="box">d2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od3' className="box">d3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od4' className="box">d4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od5' className="box">d5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od6' className="box">d6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od7' className="box">d7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od8' className="box">d8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od9' className="box">d9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='od10' className="box">d10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe1' className="box">e1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe2' className="box">e2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe3' className="box">e3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe4' className="box">e4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe5' className="box">e5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe6' className="box">e6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe7' className="box">e7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe8' className="box">e8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe9' className="box">e9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oe10' className="box">e10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of1' className="box">f1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of2' className="box">f2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of3' className="box">f3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of4' className="box">f4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of5' className="box">f5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of6' className="box">f6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of7' className="box">f7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of8' className="box">f8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of9' className="box">f9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='of10' className="box">f10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og1' className="box">g1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og2' className="box">g2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og3' className="box">g3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og4' className="box">g4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og5' className="box">g5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og6' className="box">g6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og7' className="box">g7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og8' className="box">g8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og9' className="box">g9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='og10' className="box">g10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh1' className="box">h1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh2' className="box">h2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh3' className="box">h3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh4' className="box">h4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh5' className="box">h5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh6' className="box">h6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh7' className="box">h7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh8' className="box">h8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh9' className="box">h9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oh10' className="box">h10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi1' className="box">i1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi2' className="box">i2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi3' className="box">i3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi4' className="box">i4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi5' className="box">i5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi6' className="box">i6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi7' className="box">i7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi8' className="box">i8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi9' className="box">i9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oi10' className="box">i10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj1' className="box">j1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj2' className="box">j2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj3' className="box">j3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj4' className="box">j4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj5' className="box">j5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj6' className="box">j6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj7' className="box">j7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj8' className="box">j8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj9' className="box">j9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} id='oj10' className="box">j10</div>
                    </div>
                </div>
           </div>
           {/********* / opponent's board ********/}
		</>
	)
}

export default GameboardPage
import React from 'react'
import { useState } from 'react'
import {getShipLocation} from '../helpers/GetShips'

const GameboardPage = ({ socket }) => {
    const [myTurn, setMyTurn] = useState(false)
    const [myAmountOfShips, setMyAmountOfShips] = useState(4);
    const [opponentAmountOfShips, setOpponentAmountOfShips] = useState(4);

    const createShips = (e) => {
        e.target.classList.toggle('ship')
        e.target.classList.toggle('box')
    }
    
    const randomizeAShipLocation = (ship, ship2) => {

         [ship, ship2] = getShipLocation()
        document.getElementById(ship).classList.add('ship')
        document.getElementById(ship).classList.remove('box')

        document.getElementById(ship2).classList.add('ship')
        document.getElementById(ship2).classList.remove('box')
        console.log('ship', ship, ship2);
    }

	const handleClickedOnBox = (e) => {
		// setActiveBox(false)
		// console.log('clicked on box. Box is active? ', activeBox)
		// console.log('clicked on: ', e.target.id)
		e.target.classList.add('disabledBox')
		e.target.classList.remove('box')

		// emit till servern och fråga om det är en träff
		socket.emit('user:click', socket.id)

		// emit till servern att det är nästa spelares tur



		setMyTurn(false)
	}


	// Listen to check if hit or miss
	socket.on('user:hitormiss', (socketId) => {
		// check if hit or miss
		let hit 


		// emit respons
		socket.emit('click:respons', socketId, hit)
	})


	// listen to if you start
	socket.on("game:playerTurn", () => {
		setMyTurn(true)
		console.log("myTurn:", myTurn)

	})

	// listen to if other player starts
	socket.on("game:playerWaiting", () => {
		setMyTurn(false)
		console.log("myTurn:", myTurn)

	})

	// listen to if hit or miss
	socket.on("response:hitormiss", (socketId, hit) => {
		// hit or miss
		// next players turn?
	})



	return (
		// Spelplan lol
		<>
		{/***   Testknappar för dev		***/}
		<button onClick={()=>{ setMyTurn(!myTurn) }} >turn toggle</button>
		<button onClick={()=>{ socket.emit("reset:room")}} >reset room</button>
		{/***	/Testknappar för dev	***/}


           <h1>Battleship</h1>
           {/********* Gameboard  vertical - A-J     Horisont - 1-10 ********/}
           <div id='mySide'>
                <div className="gameboard-wapper">
                    <button onClick={()=> {
                        randomizeAShipLocation('shipOne', 'shipOne2')
                        randomizeAShipLocation('shipTwo', 'shipTwo2')
                    }}>get a location</button>
                    <div className='row'>
                        <div onClick={createShips} id='a1' className="box">a1</div>
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
                <div className='scoreboard'>
                    <h2 className={myTurn ? 'playersTurn' : ''}>You</h2> {/* if-statment- if it is my turn give this .playersTurn */}
                    Amount of ships I have left: {myAmountOfShips}
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
						}} className="box">a1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">a10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">b9</div>
                        <div 
							onClick={() => {
								if (myTurn) {
									handleClickedOnBox()
								}
							}} 
							className="box"
						>b10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">c10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">d10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">e10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">f10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">g10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">h10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">i10</div>
                    </div>
                    <div className='row'>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j1</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j2</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j3</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j4</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j5</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j6</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j7</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j8</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j9</div>
                        <div onClick={(e) => {
							if (myTurn) {
								handleClickedOnBox(e)
							}
						}} className="box">j10</div>
                    </div>
                </div>
           </div>
           {/********* / opponent's board ********/}
		</>
	)
}

export default GameboardPage

import { myTurn, myAmountOfShips, opponentAmountOfShips } from '../pages/GameboardPage'

export default function Battleboard() {

    let myBoard = document.querySelector('.gameboardWrapper')
    let opponentBoard = document.querySelector('.opponentGameboardWrapper')

    const myBattleBoard = [
        ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10' ],
        ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10' ],
        ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10' ],
        ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10' ],
        ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10' ],
        ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10' ],
        ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10' ],
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10' ],
        ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10' ],
        ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10' ]
    ]

    const opponentBattleBoard = [
        ['oa1', 'oa2', 'oa3', 'oa4', 'oa5', 'oa6', 'oa7', 'oa8', 'oa9', 'oa10' ],
        ['ob1', 'ob2', 'ob3', 'ob4', 'ob5', 'ob6', 'ob7', 'ob8', 'ob9', 'ob10' ],
        ['oc1', 'oc2', 'oc3', 'oc4', 'oc5', 'oc6', 'oc7', 'oc8', 'oc9', 'oc10' ],
        ['od1', 'od2', 'od3', 'od4', 'od5', 'od6', 'od7', 'od8', 'od9', 'od10' ],
        ['oe1', 'oe2', 'oe3', 'oe4', 'oe5', 'oe6', 'oe7', 'oe8', 'oe9', 'oe10' ],
        ['of1', 'of2', 'of3', 'of4', 'of5', 'of6', 'of7', 'of8', 'of9', 'of10' ],
        ['og1', 'og2', 'og3', 'og4', 'og5', 'og6', 'og7', 'og8', 'og9', 'og10' ],
        ['oh1', 'oh2', 'oh3', 'oh4', 'oh5', 'oh6', 'oh7', 'oh8', 'oh9', 'oh10' ],
        ['oi1', 'oi2', 'oi3', 'oi4', 'oi5', 'oi6', 'oi7', 'oi8', 'oi9', 'oi10' ],
        ['oj1', 'oj2', 'oj3', 'oj4', 'oj5', 'oj6', 'oj7', 'oj8', 'oj9', 'oj10' ]
    ]

    myBattleBoard.forEach( (id) => {
        myBoard.innerHTML = `<div id=${id} >${id}</div>`;
    })

    opponentBattleBoard.forEach( (id) => {
        opponentBoard.innerHTML = `<div onClick={(e) => { if (myTurn) { handleClickedOnBox(e) }}}>${id}</div>`;
    })

	return (

		<>
			<h1>Battleship</h1>
			{/********* / Gameboard ********/}
			<div id='mySide'>
				<div className="gameboardWrapper"></div>
				<div className='scoreboard'>
					<h2 className={myTurn ? 'playersTurn' : ''}>You</h2> 
					Amount of ships I have left: {myAmountOfShips}
				</div>
			</div>
			{/********* / Gameboard ********/}

			{/********* opponent's board ********/}
			<div id='opponentSide'>
				<div className='scoreboard'>
				<div className="opponentGameboardWrapper"></div>
					<h2 className={myTurn ? '' : 'playersTurn'}>Your opponent</h2> 
					Amount of ships opponent have left: {opponentAmountOfShips}
				</div>
                <div className="gameboard-wrapper"></div>
            </div>
            {/********* / opponent's board ********/}
        </>
    )
}


export default function Battleboard({ onClick, myTurn }) {


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

	function uniqueId() {
		const id = "id" + Math.random().toString(16).slice(2)
		return id
	}



	return (

		<>
			{
				opponentBattleBoard.map( row =>
					<div className='row' key={uniqueId()}>
						{row.map( id => {
							return(
								<div 
									onClick={e => {
										if (myTurn) {onClick(e)}
									}} 
									id={id}
									className="box"
									key={id}
								>{id.substring(1)}</div>
							)
						})}
					</div>
				)
			}
		</>
		)
	}

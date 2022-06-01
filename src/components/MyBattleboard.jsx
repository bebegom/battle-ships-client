// react
import { useEffect } from "react"

// components & helpers
import { uniqueId } from "../helpers/uniqueId"
import { randomizeShips } from './randomizeShips';

export default function MyBattleboard({ myArray }) {
	
	const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', ]
	const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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


    useEffect(() => {
		console.log("Re-render from MY")
	})


	return (
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

    )
}


import { useEffect } from "react"
import { uniqueId } from "../helpers/uniqueId"

export default function OpponentBattleboard({ oppArray, onClick, myTurn }) {


	useEffect(() => {
		console.log("Re-render from OPP")
	})

	return (
		oppArray.map(row => 
			<div className='row' key={uniqueId()}>
				{row.map( obj => {
					return(
						<div 
							onClick={e => {
								if (myTurn) {onClick(e)}
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
	)
}




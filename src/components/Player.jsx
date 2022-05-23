import { React, useState } from 'react'
import { destroyer, submarine, cruiser, battleship } from './randomizeShips';

export default function Player() {
	const [battleshipHP, setBattleshipHP] = useState(4);
	const [cruiserHP, setCruiserHP] = useState(3);
	const [submarineHP, setSubmarineHP] = useState(2);
	const [destroyerHP, setDestroyerHP] = useState(2);

	const [destroyer1, destroyer2] = destroyer

	return (
		<div>
			{/* first id: {destroyer1} and second id : {destroyer2} */}
		</div>
	)
}

import { React, useState, useEffect } from 'react'
import { destroyer, submarine, cruiser, battleship } from '../components/randomizeShips';


export default function Player() {
	const [battleshipHP, setBattleshipHP] = useState(4);
	const [cruiserHP, setCruiserHP] = useState(3);
	const [submarineHP, setSubmarineHP] = useState(2);
	const [destroyerHP, setDestroyerHP] = useState(2);

	// useEffect(()=> {
	// 	setDestroyerHP(destroyerHP-1)
	// }, [destroyer])
	
	// useEffect(()=> {
	// 	setSubmarineHP(submarineHP-1)
	// }, [submarine])
	
	// useEffect(()=> {
	// 	setCruiserHP(cruiserHP-1)
	// }, [cruiser])
	
	// useEffect(()=> {
	// 	setBattleshipHP(battleshipHP-1)
	// }, [battleship])

	return (
		<div>
			BattleshipHP: {battleshipHP} CruiserHP: {cruiserHP}, submarineHP: {submarineHP}, destroyerHP: {destroyerHP}, 
		</div>
	)
}

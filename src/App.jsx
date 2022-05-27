// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'

// Components & pages
import GameboardPage from './pages/GameboardPage';
// import {resetShips} from './components/randomizeShips';
import Startoverlay from './components/Startoverlay';
import WinOverlay from './components/WinOverlay';
import LoseOverlay from './components/LoseOverlay';

// Styles
import './App.css';

const socket = socketio.connect('http://localhost:4000')

function App() {
	const [startOverlay, setStartOverlay] = useState(true)
	const [winOverlay, setWinOverlay] = useState(false)
	const [loseOverlay, setLoseOverlay] = useState(false)
	
	socket.on('game:start', (userId, opponent) => {
		setStartOverlay(false)
	})

	socket.on('you:lost', () => {
		setLoseOverlay(true)
	})

	socket.on('opponent:have:no:ships:left', () => {
		setWinOverlay(true)
		console.log('you win! ', winOverlay)
	})

	function handlePlayAgain() {
		setWinOverlay(false)
		setLoseOverlay(false)

		socket.emit("reset:room", socket.id)

		setStartOverlay(true)
	}


	return (
    	<div id="App">

			{startOverlay && 
				<Startoverlay socket={socket}/> 
			}

			{winOverlay && 
				<WinOverlay socket={socket} playAgain={handlePlayAgain}/> 
			}

			{loseOverlay && 
				<LoseOverlay socket={socket} playAgain={handlePlayAgain}/> 
			}


			
			<GameboardPage socket={socket}/>
			
		</div>
	);
}

export default App;

// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'
import useSound from 'use-sound'

// Assets
import battletheme from './assets/audio/battletheme.mp3'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';
import WinOverlay from './components/WinOverlay';
import LoseOverlay from './components/LoseOverlay';
import OccupiedOverlay from './components/OccupiedOverlay';

// Styles
import './App.css';

// TODO: ändra till heroku-app-länken
// const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)
const socket = socketio.connect('http://localhost:4000')

function App() {
	const [startOverlay, setStartOverlay] = useState(true)
	const [winOverlay, setWinOverlay] = useState(false)
	const [loseOverlay, setLoseOverlay] = useState(false)
	const [occupiedOverlay, setOccupiedOverlay] = useState(false)

	const [playBattleTheme, { stop }] = useSound(battletheme, { volume: 0.25 })

	socket.on('game:start', (userId, opponent) => {
		setStartOverlay(false)
		playBattleTheme()
	})
	
	socket.on('you:lost', () => {
		setLoseOverlay(true)
		stop()
	})

	socket.on('opponent:have:no:ships:left', () => {
		setWinOverlay(true)
		stop()
	})

	socket.on("reload", () => {
		setWinOverlay(true)
	})

	socket.on("game:occupied", () => {
		setStartOverlay(false)
		setOccupiedOverlay(true)
		stop()
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

			{occupiedOverlay && 
				<OccupiedOverlay socket={socket}/> 
			}

			<GameboardPage socket={socket}/>
			
		</div>
	);
}

export default App;

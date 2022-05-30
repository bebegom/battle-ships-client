// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'
import useSound from 'use-sound'
import battletheme from './assets/audio/battletheme.mp3'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';
import WinOverlay from './components/WinOverlay';
import LoseOverlay from './components/LoseOverlay';

// Styles
import './App.css';

// TODO: ändra till heroku-app-länken
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

function App() {
	const [startOverlay, setStartOverlay] = useState(true)
	const [winOverlay, setWinOverlay] = useState(false)
	const [loseOverlay, setLoseOverlay] = useState(false)

	const [playBattleTheme, { stop }] = useSound(battletheme, { volume: 0.25 })


	socket.on('game:start', (userId, opponent) => {
		setStartOverlay(false)
		playBattleTheme();
	})
	
	socket.on('you:lost', () => {
		setLoseOverlay(true)
		stop()
	})

	socket.on('opponent:have:no:ships:left', () => {
		setWinOverlay(true)
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


			
			<GameboardPage socket={socket}/>
			
		</div>
	);
}

export default App;

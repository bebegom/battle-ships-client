// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';
import WinOverlay from './components/WinOverlay';
import LoseOverlay from './components/LoseOverlay';

// Styles
import './App.css';

const socket = socketio.connect('http://localhost:4000')

function App() {
	const [overlay, setOverlay] = useState(true)
	const [winOverlay, setWinOverlay] = useState(false)
	const [loseOverlay, setLoseOverlay] = useState(false)
	
	socket.on('game:start', (userId, opponent) => {
		setOverlay(false)
	})

	socket.on('game:won', () => {
		setOverlay(true)
	})

	socket.on('game:lost', () => {
		setOverlay(true)
	})

	return (
    	<div id="App">

			{overlay && 
				<Startoverlay socket={socket}/> 
			}

			{winOverlay && 
				<WinOverlay socket={socket}/> 
			}

			{loseOverlay && 
				<LoseOverlay socket={socket}/> 
			}


			
			<GameboardPage socket={socket}/>
			
		</div>
	);
}

export default App;

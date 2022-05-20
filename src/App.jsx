// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';

// Styles
import './App.css';

const socket = socketio.connect('http://localhost:4000')

function App() {
	const [overlay, setOverlay] = useState(true)
	
	socket.on('game:start', (userId, opponent) => {

		setOverlay(false)
	})


	return (
    	<div id="App">

			{overlay && 
				<Startoverlay socket={socket}/> 
			}
			
			<GameboardPage socket={socket}/>
			
		</div>
	);
}

export default App;

// React & Socket
import { useState } from 'react'
import socketio from 'socket.io-client'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';

// Styles
import './App.css';

// TODO: ändra till heroku-app-länken
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

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

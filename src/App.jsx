// React & Socket
import socketio from 'socket.io-client'

// Components & pages
import GameboardPage from './pages/GameboardPage';
import Startoverlay from './components/Startoverlay';

// Styles
import './App.css';

const socket = socketio.connect('http://localhost:4000')

function App() {
	return (
    	<div id="App">

			<Startoverlay socket={socket}/>
			
			<GameboardPage />
			
		</div>
	);
}

export default App;

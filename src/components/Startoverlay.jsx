// React
import { useState } from 'react'
import useSound from 'use-sound'

// Assets
import click from '../assets/audio/click.wav'


export default function Startoverlay({ socket }) {
	const [button, setButton] = useState(true)
	const [loading, setLoading] = useState(false)

	const [playClickSound] = useSound(click, { volume: 0.2 })

	const handleSubmit = (e) => {
		e.preventDefault()

		setButton(false)
		setLoading(true)

		console.log(`User with id '${socket.id}' Connected`)
		socket.emit('user:connect', socket.id)
	}

	return (
		<div id="container">
			<div className="bg-fade">
				<div className="card">
					<h2>Welcome, Marine!</h2>
					<p>Get ready for battle</p>
					{button && 
						<form onSubmit={handleSubmit}>
							<button 
								className="button" 
								type="submit"
								onClick={()=> playClickSound()}
							>Join game</button>
						</form>
					}
					{loading &&
						<h3>Waiting for opponent...</h3>
					}
				</div>

			</div>
		</div>
	)
}

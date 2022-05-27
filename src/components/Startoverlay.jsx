import { useState } from 'react'


export default function Startoverlay({ socket }) {
	const [button, setButton] = useState(true)
	const [loading, setLoading] = useState(false)

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
					<h2>Welcome to Battleships, Marine!</h2>
					<p>Get ready for battle</p>

					{button && 
						<form onSubmit={handleSubmit}>
							<button type="submit">Join game</button>
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

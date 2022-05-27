import React from 'react'


export default function Startoverlay({ socket }) {

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(`User with id '${socket.id}' Connected`)
		socket.emit('user:connect', socket.id)
	}

	return (
		<div id="container">
			<div className="bg-fade">

				<div className="card">
					<h2>Welcome to Battleships, Marine!</h2>
					<p>Get ready for battle</p>
					<form onSubmit={handleSubmit}>
						<button type="submit">Join game</button>
					</form>
				</div>

			</div>
		</div>
	)
}

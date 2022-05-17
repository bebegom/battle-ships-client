import React from 'react'
import { io } from "socket.io-client";


export default function Startoverlay() {

	const handleSubmit = () => {
		io.emit('user:connected')

	}

	return (
		<div id="container">
			<form onSubmit={handleSubmit}>
  				<button type="submit">Join game</button>
			</form>
		</div>
	)
}

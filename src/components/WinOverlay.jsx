import React from 'react'


export default function WinOverlay({ socket }) {

	const handleSubmit = (e) => {
		e.preventDefault()
		// play again?

	}

	return (
		<div id="container">
			<div className="bg-fade">

				<div className="card">

					<h2>Congratulations, Marine!</h2>
					<p>You are the winner</p>
					<form onSubmit={handleSubmit}>
						<button type="submit">Play again</button>
					</form>
				</div>
			</div>
		</div>
	)
}

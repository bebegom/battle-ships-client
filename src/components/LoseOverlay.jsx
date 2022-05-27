import React from 'react'


export default function LoseOverlay({ socket }) {

	const handleSubmit = (e) => {
		e.preventDefault()
		// play again?

	}

	return (
		<div id="container">
			<div className="bg-fade">

				<div className="card">
					<h2>Sorry, Marine!</h2>
					<p>Better hit the training grounds...</p>
					<form onSubmit={handleSubmit}>
						<button type="submit">Play again</button>
					</form>
				</div>
			</div>
		</div>
	)
}

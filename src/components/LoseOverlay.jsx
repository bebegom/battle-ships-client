import React from 'react'
import useSound from 'use-sound'
import click from '../assets/audio/click.wav'

export default function LoseOverlay({ playAgain }) {

	const [playClickSound] = useSound(click, { volume: 0.2 })


	const handleSubmit = (e) => {
		e.preventDefault()
		playAgain()
		
	}

	return (
		<div id="container">
			<div className="bg-fade">

				<div className="card">
					<h2>Sorry, Marine!</h2>
					<p>Better hit the training grounds...</p>
					<form onSubmit={handleSubmit}>
						<button 
							className="button" 
							type="submit"
							onClick={()=> playClickSound()}
						>Play again</button>
					</form>
				</div>
			</div>
		</div>
	)
}

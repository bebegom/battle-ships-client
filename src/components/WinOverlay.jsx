// React
import React from 'react'
import useSound from 'use-sound'

// Assets
import click from '../assets/audio/click.wav'


export default function WinOverlay({ playAgain }) {
	const [playClickSound] = useSound(click, { volume: 0.2 })

	const handleSubmit = (e) => {
		e.preventDefault()
		playAgain()
		
	}

	return (
		<div id="container">
			<div className="bg-fade">
				<div className="card">
					<h2>Congratulations, Marine!</h2>
					<p>You are the winner</p>
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

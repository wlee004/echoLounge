import React from 'react'

// Components 
import SearchBar from '../../components/searchbar'

export default function Lounge() {
	return (
		<div>
			<header>
				<nav className= "navbar bg-body-tertiary" data-bs-theme="dark">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1">Echo Lounge</span>
					</div>
				</nav>
			</header>
			<SearchBar/>
		</div>
	)
}

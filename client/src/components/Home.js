import React from 'react'
import SearchBar from './SearchBar'
import Teachers from './Teachers'

function Home() {
	return (
		<div className="row mb-5">
			<SearchBar />
			<Teachers />
		</div>
	)
}

export default Home
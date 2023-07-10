import React from 'react'

function CatCard({ cat }) {
	return (
		<div className='w-[250px] h-[350px] flex items-center flex-col p-2 m-3 border-2'>
			<img
				className='w-full h-full flex items-center justify-center'
				src={cat}
				alt='Loading...'
			/>
		</div>
	)
}

export default CatCard

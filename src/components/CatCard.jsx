import React from 'react'

function CatCard({ cat }) {
	return (
		<div className='w-[250px] h-[350px] flex items-center flex-col m-3'>
			<img
				className='w-full h-full flex items-center justify-center rounded-lg'
				src={cat}
				alt='cat'
			/>
		</div>
	)
}

export default CatCard

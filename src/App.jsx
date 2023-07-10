import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CatCard from './components/CatCard'
import { fetchCatsData } from './features/catsSlice'

function App() {
	const dispatch = useDispatch()
	const cats = useSelector(state => state.cats)
	const [isCatsShowed, setCatsShowed] = useState(false)

	useEffect(() => {
		dispatch(fetchCatsData())
	}, [])

	function otherCats() {
		dispatch(fetchCatsData())
	}

	return (
		<div className='w-full h-full flex items-center justify-center flex-col p-3'>
			<div className='flex flex-wrap items-center justify-center'>
				<button
					className='w-[100px] h-[35px] border-2 border-black rounded-md transition hover:bg-black hover:text-white m-2'
					onClick={() => setCatsShowed(true)}
				>
					Show cats!
				</button>
				<button
					className='w-[100px] h-[35px] border-2 border-black rounded-md transition hover:bg-black hover:text-white m-2'
					onClick={() => setCatsShowed(false)}
				>
					Hide cats!
				</button>
				<button
					className='w-[100px] h-[35px] border-2 border-black rounded-md transition hover:bg-black hover:text-white m-2'
					onClick={otherCats}
				>
					Other cats!
				</button>
			</div>
			{isCatsShowed ? (
				<div className='w-full h-screen flex items-center justify-center flex-wrap'>
					{cats.map(cat => (
						<CatCard key={cat.id} cat={cat.url} />
					))}
				</div>
			) : <p className='text-2xl mt-[100px] text-center'>Click show cats!!!</p>}
		</div>
	)
}

export default App

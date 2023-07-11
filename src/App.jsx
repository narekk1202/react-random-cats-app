import axios from 'axios'
import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import CatCard from './components/CatCard'
import Loading from './components/Loading'
import { fetchCategories } from './features/categoriesSlice'
import { fetchCatsData } from './features/catsSlice'

function App() {
	const dispatch = useDispatch()
	const cats = useSelector(state => state.cats)
	const categories = useSelector(state => state.categories)
	const [catsByCategory, setCatsByCategory] = useState([])
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		navigate('/')
		dispatch(fetchCatsData())
		dispatch(fetchCategories())
	}, [])

	async function fetchByCategory(categoryId) {
		try {
			const response = await axios.get(
				`https://api.thecatapi.com/v1/images/search?format=json&limit=10&category_ids=${categoryId}`,
				{
					headers: {
						'x-api-key':
							'live_tnwz6tgqgbBEXRbiwTDiO0A2K0hljBFHs1usxLiPWXKYOZLOVhLz7mXZ6qvMkCoF',
					},
				}
			)
			return setCatsByCategory(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	async function loadMore(endpoint) {
		try {
			const response = await axios.get(
				`https://api.thecatapi.com/v1/images/search?format=json&limit=10&category_ids=${endpoint}`,
				{
					headers: {
						'x-api-key':
							'live_tnwz6tgqgbBEXRbiwTDiO0A2K0hljBFHs1usxLiPWXKYOZLOVhLz7mXZ6qvMkCoF',
					},
				}
			)
			return setCatsByCategory(prev => [...prev, ...response.data])
		} catch (error) {
			console.log(error)
		}
		console.log(catsByCategory)
	}

	return (
		<div className='w-full min-h-screen flex items-center justify-center  flex-col'>
			{cats.length === 0 ? (
				<Loading />
			) : (
				<>
					<div className='flex items-center justify-center flex-wrap'>
						{categories.map(category => {
							return (
								<NavLink
									to={`/${category.id}`}
									onClick={() => fetchByCategory(category.id)}
									key={nanoid()}
									className='w-[100px] h-[35px] border-2 border-black flex items-center justify-center rounded-md transition hover:bg-black hover:text-white m-2'
								>
									{category.name}
								</NavLink>
							)
						})}
					</div>
					<div className='w-full flex items-center justify-center flex-wrap'>
						{catsByCategory.length === 0 ? (
							cats.map(cat => <CatCard key={nanoid()} cat={cat.url} />)
						) : catsByCategory.length !== 0 ? (
							catsByCategory?.map(cats => (
								<CatCard key={nanoid()} cat={cats.url} />
							))
						) : (
							<Loading />
						)}
					</div>
					<button
						onClick={() => loadMore(location.pathname.substring(1))}
						className='w-[100px] h-[35px] border-2 border-black flex items-center justify-center rounded-md transition hover:bg-black hover:text-white'
					>
						Load more
					</button>
				</>
			)}
		</div>
	)
}

export default App

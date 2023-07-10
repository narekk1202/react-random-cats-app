import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCatsData = createAsyncThunk('cats/fetchCats', async () => {
	try {
		const response = await axios.get(
			'https://api.thecatapi.com/v1/images/search?format=json&limit=10'
		)
		return response.data
	} catch (err) {
		console.log(err)
	}
})

export const catsSlice = createSlice({
	name: 'catsSlice',
	initialState: [],
	reducers: {
		addCat: (state, action) => {
			return [...state, action.payload]
		},
		
	},
	extraReducers: builder => {
		builder.addCase(fetchCatsData.fulfilled, (state, action) => {
			return action.payload
		})
	},
})

export const { addCat } = catsSlice.actions
export default catsSlice.reducer

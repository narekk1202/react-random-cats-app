import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('cets/categories', async () => {
	try {
		const response = await axios.get('https://api.thecatapi.com/v1/categories')
		return response.data
	} catch (error) {
		console.log(error)
	}
})

export const categoriesSlice = createSlice({
	name: 'category',
	initialState: [],
	reducers: {
		addToCategories: (state, action) => {
			return [...state, action.payload]
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			return action.payload
		})
	},
})

export const { addToCategories } = categoriesSlice.actions
export default categoriesSlice.reducer

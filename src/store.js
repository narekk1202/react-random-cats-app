import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './features/catsSlice';
import categoriesReducer from './features/categoriesSlice';

export const store = configureStore({
	reducer: {
		cats: catsReducer,
		categories: categoriesReducer
	},
})
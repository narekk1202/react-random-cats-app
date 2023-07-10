import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './features/catsSlice';

export const store = configureStore({
	reducer: {
		cats: catsReducer
	},
})
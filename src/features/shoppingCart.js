import { createSlice, nanoid } from '@reduxjs/toolkit'

const createItem = item => ({
	id: nanoid(),
	...item,
})
const initialState = {
	items: [],
	total: 0,
	prices: {
		people: 10,
		starships: 20,
		vehicles: 5.5,
		planets: 100,
		films: 12.99,
	},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducer: {
		addItem: (state, action) => {
			// create item
			// add item to items
			const itemID = action.payload.id ? action.payload.id : 'no item'
			const addItem = createItem(action.payload, itemID)
		state.push(addItem)

		},
		removeItem: (state, action) => {
			// find fave
			// remove fave
			const id = action.payload

			 const removeId = state.filter((item) => item.id !== id);

			return removeId;
		},
		editCartItem: (state, action) => {
			return state.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload.data } : item,
      );

		}
	},
})

export const { addItem, removeItem } = cartSlice

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { characterSlice } from './../features/character'
import { filmSlice } from './../features/film'
import { favesSlice } from './../features/faves'
// import { swapiApi } from './../services/base'
import { appSlice } from '../features/app'
import { swapApi } from '../services/swapApi'
export const store = configureStore({
	reducer: {
		character: characterSlice.reducer,
		film: filmSlice.reducer,
		faves: favesSlice.reducer,
		app: appSlice.reducer,
		[swapApi.reducerPath]: swapApi.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(swapApi.middleware),

})
setupListeners(store.dispatch)

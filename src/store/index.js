import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/TodoSlice";

// Create Store
const store = configureStore({
	reducer: {
		todoReducer,
	},
});

export default store;

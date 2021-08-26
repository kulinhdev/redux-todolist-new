import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// *&* Reducer thunk (new) *&* \\\

// Fetch all data from server
export const getTodos = createAsyncThunk("todos/todosFetchAll", async () => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/todos?_limit=5"
	);

	return response.data;
});

// Add new task
export const addNewTodo = createAsyncThunk(
	"todos/addNewTodo",
	async (title) => {
		const newTodo = {
			id: nanoid(),
			title,
			completed: false,
		};

		await axios.post(
			"https://jsonplaceholder.typicode.com/todos?_limit=5",
			newTodo
		);

		return newTodo;
	}
);

// Delete todo
export const deleteTodo = createAsyncThunk(
	"todos/todoDelete",
	async (todoId) => {
		await axios.delete(
			`https://jsonplaceholder.typicode.com/todos/${todoId}`
		);

		return todoId;
	}
);

// Innit State
const todosSlice = createSlice({
	name: "todos",
	initialState: {
		allTodos: [],
	},
	reducers: {
		// addNewTodo: {
		// 	reducer(state, action) {
		// 		state.allTodos.unshift(action.payload);
		// 	},
		// 	prepare(title) {
		// 		return {
		// 			payload: {
		// 				id: nanoid(),
		// 				title,
		// 				completed: false,
		// 			},
		// 		};
		// 	},
		// },

		// Change todo completed
		markComplete(state, action) {
			const todoId = action.payload;

			state.allTodos = state.allTodos.map((todo) => {
				if (todo.id === todoId) todo.completed = !todo.completed;
				return todo;
			});
		},

		// Delete task
		// removeTask(state, action) {
		// 	const todoId = action.payload;

		// 	state.allTodos = state.allTodos.filter(
		// 		(todo) => todo.id !== todoId
		// 	);
		// },

		// Get all todos
		// todosFetched(state, action) {
		// 	state.allTodos = action.payload;
		// },
	},
	extraReducers: {
		// Get all todos
		[getTodos.pending]: (state, action) => {
			console.log("Fetching data from server ...");
		},
		[getTodos.fulfilled]: (state, action) => {
			state.allTodos = action.payload;
		},
		[getTodos.rejected]: (state, action) => {
			console.log("Get data from server failed ...");
		},

		// Add new todo
		[addNewTodo.fulfilled]: (state, action) => {
			state.allTodos.unshift(action.payload);
		},

		// Delete todo
		[deleteTodo.fulfilled]: (state, action) => {
			state.allTodos = state.allTodos.filter(
				(todo) => todo.id !== action.payload
			);
		},
	},
});

// Async Action creator =A> Action =A> Reducer =A> Dispatch
// export const getTodos = () => async (dispatch) => {
// 	try {
// 		const response = await axios.get(
// 			"https://jsonplaceholder.typicode.com/todos?_limit=5"
// 		);
// 		dispatch(todosFetched(response.data));
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// Create Reducer
const todoReducer = todosSlice.reducer;

// Export Action
export const { markComplete, removeTask } = todosSlice.actions;

// Export Selector
export const todoSelector = (state) => state.todoReducer.allTodos;

export default todoReducer;

import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import { useSelector, useDispatch } from "react-redux";
import {
	getTodos,
	todoSelector,
	markComplete,
	deleteTodo,
} from "../store/reducers/TodoSlice";

const Todo = () => {
	const todos = useSelector(todoSelector);

	const dispatch = useDispatch();

	const toggleComplete = (id) => {
		dispatch(markComplete(id));
	};

	const removeTask = (id) => {
		dispatch(deleteTodo(id));
	};

	// Fetch all todos
	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	return (
		<div className="todo-list">
			<TodoForm />
			<div className="todo-task">
				<ul>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={todo.completed ? "completed" : ""}
						>
							{todo.title}
							<input
								type="checkbox"
								onChange={() => toggleComplete(todo.id)}
							/>
							<button onClick={() => removeTask(todo.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Todo;

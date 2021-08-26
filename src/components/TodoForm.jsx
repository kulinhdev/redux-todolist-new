import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../store/reducers/TodoSlice";

const TodoForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");

	const onTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const onAddTask = (e) => {
		e.preventDefault();

		// Call dispatch method
		dispatch(addNewTodo(title));

        // Reset title
		setTitle("");
	};

	return (
		<div>
			<h3>Add new task:</h3>
			<form onSubmit={onAddTask}>
				<input
					type="text"
					placeholder="Enter your task name !"
					name="title"
					value={title}
					onChange={onTitleChange}
				/>
				<input type="submit" value="Save" />
			</form>
		</div>
	);
};

export default TodoForm;

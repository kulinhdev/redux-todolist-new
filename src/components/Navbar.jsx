import React from "react";
import { useSelector } from "react-redux";
import { todoSelector } from "../store/reducers/TodoSlice";

const Navbar = () => {
	const todos = useSelector(todoSelector);

	return (
		<div className="navbar">
			<h1>My todos App</h1>
			<ul>
				<li>Total tasks: {todos.length}</li>
			</ul>
		</div>
	);
};

export default Navbar;

import React from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Todo />
		</div>
	);
}

export default App;

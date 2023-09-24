import { useState } from "react";
import sun from "./images/icon-sun.svg";
export default function App() {
	const [todo, setTodo] = useState("");
	const [todoArr, setTodoArr] = useState([]);

	function handleTodoArr(newTodo) {
		setTodoArr(todoArr => [newTodo, ...todoArr]);
	}
	function handleAddTodo(e) {
		e.preventDefault();
		if (!todo) return;
		handleTodoArr(todo);
		setTodo("");
	}
	function handleDeleteItem(index) {
		setTodoArr(todoArr => todoArr.filter((_, i) => i !== index));
	}

	return (
		<div>
			<Logo />
			<AddNewToDo
				todo={todo}
				onSetTodo={setTodo}
				handleAddTodo={handleAddTodo}
			/>
			<ToDoList todoArr={todoArr} onDeleteItem={handleDeleteItem} />
			<SortPanel />
		</div>
	);
}

function Logo() {
	return (
		<div className='logo-container'>
			<h1>TODO</h1>
			<span>
				<img src={sun} alt='Change to light theme' />
			</span>
		</div>
	);
}
function Button({ secondButtonClass, handleClick }) {
	return (
		<button
			className={`button ${secondButtonClass}`}
			onClick={handleClick}></button>
	);
}

function AddNewToDo({ todo, onSetTodo, handleAddTodo }) {
	return (
		<form className='new-todo' onSubmit={handleAddTodo}>
			{/* <button className='add-new-todo-button'></button> */}
			<Button secondButtonClass={"add-new-todo-button"} />
			<input
				className='new-todo-input'
				placeholder='Create a new todo'
				value={todo}
				onChange={e => onSetTodo(e.target.value)}
			/>
		</form>
	);
}

function ToDoList({ todoArr, onDeleteItem }) {
	return (
		<div className='todo-container'>
			{todoArr.map((todoItem, i) => (
				<TodoItem
					todoItem={todoItem}
					index={i}
					key={i}
					onDeleteItem={onDeleteItem}
				/>
			))}

			<InfoPanel />
		</div>
	);
}

function TodoItem({ todoItem, onDeleteItem, index, handleClick }) {
	const [select, setSelect] = useState(false);
	// const [selectArr, setSelectArr] = useState([]);
	function handleCheck() {
		setSelect(select => !select);
		
	}

	return (
		<div className='todo-item'>
			{/* <button className='select-button'></button> */}
			<Button
				secondButtonClass={
					select ? "select-button selected-button" : "select-button"
				}
				value={select}
				handleClick={handleCheck}
			/>
			<div className='todo-item-delete'>
				<p className={select ? "todo-name selected-text" : "todo-name"}>
					{todoItem}
				</p>
				{/* <button className='delete-button'></button> */}
				<Button
					secondButtonClass={"delete-button"}
					handleClick={() => onDeleteItem(index)}
				/>
			</div>
		</div>
	);
}

function InfoPanel() {
	return (
		<div className='todo-item info-panel'>
			<p>5 items left</p>
			<p>clear complited</p>
		</div>
	);
}

function SortPanel() {
	return (
		<div className='sort-container'>
			<p>All</p>
			<p>Active</p>
			<p>Completed</p>
		</div>
	);
}

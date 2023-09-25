import { useState } from "react";
import sun from "./images/icon-sun.svg";
export default function App() {
	const [todo, setTodo] = useState("");
	const [todoArr, setTodoArr] = useState([]);

	function handleTodoArr(item) {
		setTodoArr(todoArr => [item, ...todoArr]);
	}

	function handleAddTodo(e) {
		const todoItem = {
			todo,
			select: false,
		};
		e.preventDefault();
		if (!todo) return;
		handleTodoArr(todoItem);
		setTodo("");
	}

	function handleDeleteItem(index) {
		setTodoArr(todoArr => todoArr.filter((_, i) => i !== index));
	}

	function handleCheck(index) {
		setTodoArr(todoArr =>
			todoArr.map((item, i) =>
				i === index ? { ...item, select: !item.select } : item
			)
		);
	}

	return (
		<div>
			<Logo />
			<AddNewToDo
				todo={todo}
				onSetTodo={setTodo}
				handleAddTodo={handleAddTodo}
			/>
			<ToDoList
				todoArr={todoArr}
				onDeleteItem={handleDeleteItem}
				onCheck={handleCheck}
			/>
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

function ToDoList({ todoArr, onDeleteItem, onCheck }) {
	return (
		<div className='todo-container'>
			{todoArr.map((todoItem, i) => (
				<TodoItem
					todoItem={todoItem}
					index={i}
					key={i}
					onDeleteItem={onDeleteItem}
					onCheck={onCheck}
				/>
			))}

			<InfoPanel todoArr={todoArr} />
		</div>
	);
}

function TodoItem({ todoItem, onDeleteItem, index, handleClick, onCheck }) {
	return (
		<div className='todo-item'>
			<Button
				secondButtonClass={
					todoItem.select ? "select-button selected-button" : "select-button"
				}
				value={todoItem.select}
				handleClick={() => onCheck(index)}
			/>
			<div className='todo-item-delete'>
				<p
					className={todoItem.select ? "todo-name selected-text" : "todo-name"}>
					{todoItem.todo}
				</p>
				<Button
					secondButtonClass={"delete-button"}
					handleClick={() => onDeleteItem(index)}
				/>
			</div>
		</div>
	);
}

function InfoPanel({ todoArr }) {
	const itemsChecked = todoArr.filter(item => item.select).length;
	const itemsLeft = todoArr.length - itemsChecked;
	return (
		<div className='todo-item info-panel'>
			<p>{itemsLeft} items left</p>
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

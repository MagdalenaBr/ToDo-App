import { useState } from "react";
import sun from "./images/icon-sun.svg";
export default function App() {
	const [todo, setTodo] = useState("");
	const [todoArr, setTodoArr] = useState([]);

	const [sortedBy, setSortedBy] = useState("allTodos");
	let sortedArr;
	if (sortedBy === "allTodos") sortedArr = todoArr;
	if (sortedBy === "activeTodo")
		sortedArr = todoArr.filter(todo => !todo.select);
	if (sortedBy === "complitedTodo")
		sortedArr = todoArr.filter(todo => todo.select);

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
				setTodoArr={setTodoArr}
				sortedArr={sortedArr}
			/>
			<SortPanel
				todoArr={todoArr}
				setTodoArr={setTodoArr}
				sortedBy={sortedBy}
				setSortedBy={setSortedBy}
			/>
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
function Button({ secondButtonClass, handleClick, children }) {
	return (
		<button className={`button ${secondButtonClass}`} onClick={handleClick}>
			{children}
		</button>
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

function ToDoList({ todoArr, onDeleteItem, onCheck, setTodoArr, sortedArr }) {
	return (
		<div className='todo-container'>
			{sortedArr.map((todoItem, i) => (
				<TodoItem
					todoItem={todoItem}
					index={i}
					key={i}
					onDeleteItem={onDeleteItem}
					onCheck={onCheck}
				/>
			))}

			<InfoPanel todoArr={todoArr} setTodoArr={setTodoArr} />
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

function InfoPanel({ todoArr, setTodoArr }) {
	const itemsChecked = todoArr.filter(item => item.select).length;
	const itemsLeft = todoArr.length - itemsChecked;

	function clearComplited() {
		setTodoArr(todoArr => todoArr.filter(todo => !todo.select));
	}
	return (
		<div className='todo-item info-panel'>
			<p>{itemsLeft} items left</p>
			{/* <p>clear complited</p>
			 */}
			<Button secondButtonClass={"stats-button"} handleClick={clearComplited}>
				Clear coplited
			</Button>
		</div>
	);
}

function SortPanel({ todoArr, sortedBy, setSortedBy }) {
	// const [sortedBy, setSortedBy] = useState("allTodos");
	// let sortedArr;
	// if (sortedBy === "allTodos") sortedArr = todoArr;
	// if (sortedBy === "activeTodo")
	// 	sortedArr = todoArr.filter(todo => !todo.select);
	// if (sortedBy === "complitedTodo")
	// 	sortedArr = todoArr.filter(todo => todo.select);

	// if
	// const activeTodo = todoArr.filter(todo => !todo.select)
	// function displayAllTodo() {
	// 	setSortedBy(todoArr);
	// }
	// function displayActiveToDo() {
	// 	setSortedBy(todoArr.filter(todo => !todo.select));
	// }
	// function displayComplitedToDo() {
	// 	setSortedBy(todoArr.filter(todo => todo.select));
	// }

	return (
		<select
			value={sortedBy}
			className='sort-container'
			onChange={e => {
				setSortedBy(e.target.value);
				console.log(e.target.value);
			}}>
			<option value='allTodos'>All</option>
			<option value='activeTodo'>Active</option>
			<option value="complitedTodo">Complited</option>
		</select>
	);
}

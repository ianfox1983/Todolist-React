import React, { useState } from "react";
import Task from "./task.jsx";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";

export function Home() {
	const [textTask, setTextTask] = useState({ task: "" });
	const [taskList, setTaskList] = useState([]);

	const sendTextTask = e => {
		e.preventDefault(); //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
		setTaskList([...taskList, textTask]); //hace una copia nueva del array
		setTextTask({ task: "" });
	};

	const clickDelete = targetIndex => {
		//_,"cuando no queremos pasarle una variable cualquiera"  // index mantiene el valor del array
		setTaskList(taskList.filter((_, index) => index !== targetIndex)); //Filter crea un nuevo array con todos los elementos que son diferentes "!==" a targetIndex
	};
	//crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos. Ylos mete en Value y index
	let todoList = taskList.map((value, index) => (
		//Value es el  elemento actual del array que se está procesando. // El índice del elemento actual dentro del array.
		<Task
			inputValue={value.task} //lista de tareas con un string diferente
			key={index} //Las keys ayudan a React a identificar que ítems han cambiado, son agregados, o son eliminados
			onMyClick={() => clickDelete(index)}
		/>
	));
	return (
		<Container>
			<Card className="mb-2 ">
				<Card.Body>
					<Card.Title>ToDO List</Card.Title>
					<form className="form shadow-none" onSubmit={sendTextTask}>
						<input
							type="text"
							value={textTask.task}
							placeholder="What needs to be done?"
							onChange={e =>
								setTextTask({ task: e.target.value })
							}
						/>
					</form>
				</Card.Body>
				<ul className="list-group-flush">{todoList}</ul>
				<Card.Body>
					{taskList.length}
					<span> task(s)</span>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Home;

const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = [
	{
		id: nanoid(),
		title: 'todo 1',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'todo 2',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 3',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 4',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'todo 5',
		completed: false,
	},
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid(), completed: false };
	todos.push(todo);
	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);
	console.log(completed);
	if (index > -1) {
		todos[index].completed = completed;
	}
	res.send(todos[index]);
});

app.patch('/todos/change/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id === id);
	const title = req.body.title;
	console.log(title);
	console.log(index);
	if (index > -1) {
		todos[index].title = title;
	}
	res.send(todos[index]);
});



app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	res.send(todos[index]);
	if (index > -1) {
		todos.splice(index, 1);
	}
	console.log(index);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));

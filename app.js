const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
require('dotenv').config();

const mysql = require('mysql');

const conn = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER, /* MySQL User */
	password: process.env.PASSWORD, /* MySQL Password */
	database: process.env.DATABASE /* MySQL Database */
});

conn.connect((err) => {
	if (err) throw err;
	console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/clientes', (req, res) => {
	let sqlQuery = "SELECT id, nome, sobrenome FROM clientes";

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/clientes/:id', (req, res) => {
	let sqlQuery = "SELECT id, nome, sobrenome,created_at as criado_em FROM clientes WHERE id=" + req.params.id;

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/clientes', (req, res) => {
	let data = { nome: req.body.nome, sobrenome: req.body.sobrenome };

	let sqlQuery = "INSERT INTO clientes SET ?";

	let query = conn.query(sqlQuery, data, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/clientes/:id', (req, res) => {
	let sqlQuery = "UPDATE items SET nome='" + req.body.nome + "', sobrenome='" + req.body.sobrenome + "' WHERE id=" + req.params.id;

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/clientes/:id', (req, res) => {
	let sqlQuery = "DELETE FROM clientes WHERE id=" + req.params.id + "";

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});


function apiResponse(results) {
	return JSON.stringify({ "status": 200, "error": null, "response": results });
}

app.listen(3000, () => {
	console.log('Server started on port ' + process.env.SERVER_POR + '...');
});
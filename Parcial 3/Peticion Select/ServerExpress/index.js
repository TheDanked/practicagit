const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// GET request
app.get('/actor', (req, res) => {
  const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0625",
    database: "sakila",
    port: 3306
  });

  conexion.query("SELECT * FROM actor LIMIT 20", function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log(results);
    console.log(fields);
    res.json({ results });
  });
});

// POST request
app.post('/actor', (req, res) => {
  // Assuming you want to insert data into the actor table
  const actorData = req.body; // Assuming the request body contains the actor data

  // Your SQL query to insert data
  const query = "INSERT INTO actor (column1, column2, ...) VALUES (?, ?, ...)";

  const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0625",
    database: "sakila",
    port: 3306
  });

  conexion.query(query, [actorData.value1, actorData.value2, ...], function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ mensaje: "Server express respondiendo a post" });
  });
});

// PUT request
app.put('/actor', (req, res) => {
  // Assuming you want to update data in the actor table
  const actorData = req.body; // Assuming the request body contains the actor data

  // Your SQL query to update data
  const query = "UPDATE actor SET column1 = ?, column2 = ... WHERE id = ?";

  const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0625",
    database: "sakila",
    port: 3306
  });

  conexion.query(query, [actorData.value1, actorData.value2, ..., actorData.id], function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ mensaje: "Server express respondiendo a put" });
  });
});

// DELETE request
app.delete('/actor', (req, res) => {
  // Assuming you want to delete data from the actor table
  const actorId = req.body.id; // Assuming the request body contains the actor ID

  // Your SQL query to delete data
  const query = "DELETE FROM actor WHERE id = ?";

  const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0625",
    database: "sakila",
    port: 3306
  });

  conexion.query(query, [actorId], function (err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ mensaje: "Server express respondiendo a delete" });
  });
});

app.listen(8082, () => {
  console.log("Servidor Express corriendo en puerto 8082");
});

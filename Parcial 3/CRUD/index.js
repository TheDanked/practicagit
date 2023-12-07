const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0625',
    database: 'sakila',
    port: 3306,
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.get('/actor', (req, res) => {
  if (req.query.actor_id) { 
      let consulta = `SELECT * FROM ACTOR WHERE ACTOR_ID = ${req.query.actor_id}`;
      console.log(consulta);
      connection.query(
          consulta,
          function (err, results, fields) {
              if (err) {
                  res.json({ status: 0, mensaje: "Error al obtener actor específico", datos: {} });
              } else {
                  if (results.length === 0) {
                      res.json({ status: 0, mensaje: "ID de actor no encontrado", datos: {} });
                  } else {
                      res.json({ status: 1, mensaje: "Actor encontrado", datos: results[0] });
                  }
              }
          }
      );
  } else {
      let consulta = 'SELECT * FROM ACTOR';
      console.log(consulta);
      connection.query(
          consulta,
          function (err, results, fields) {
              if (err) {
                  res.json({ status: 0, mensaje: "Error al obtener todos los actores", datos: [] });
              } else {
                  if (results.length === 0) {
                      res.json({ status: 0, mensaje: "No se encontraron actores", datos: [] });
                  } else {
                      res.json({ status: 1, mensaje: "Actores encontrados", datos: results });
                  }
              }
          }
      );
  }
});


app.post('/actor', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof (req.query.actor_id) == 'undefined' || typeof (req.query.first_name) == 'undefined' || typeof (req.query.last_name) == 'undefined' || typeof (req.query.last_update) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Completa todos los campos por favor",
            datos: {}
        });
    }
    else {
        sentenciaSQL = `INSERT INTO actor (actor_id,first_name,last_name,last_update)VALUES('${req.query.actor_id}', '${req.query.first_name}', '${req.query.last_name}', '${req.query.last_update}')`;
        console.log(sentenciaSQL);
        connection.query(sentenciaSQL, function (err, results, fields) {
            console.log(results);
            if (results && results.affectedRows == 1) {
                res.json({
                    status: 1,
                    mensaje: "Inserción exitosa",
                    datos: {}
                });
            } else {
                res.json({
                    status: 0,
                    mensaje: "Hubo un error al insertar",
                    datos: {}
                });
            }
        });
    }
});

app.delete('/actor', (req, res) => {
    console.log(req.query.ID);
    let sentenciasql = ''
    if (typeof (req.query.actor_id) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Falto enviar ID",
            datos: {}
        });
    }
    else {
        sentenciasql = `DELETE FROM ACTOR WHERE ACTOR_ID = ${req.query.actor_id}`;
    }

    connection.query(sentenciasql, function (err, results, fields) {

        console.log(err);
        console.log(results);
        console.log(fields);

        if (results.affectedRows == 1) {
            res.json({
                status: 1,
                mensaje: "Registro eliminado",
                datos: {} });
        } else {
            res.json({
                status: 0,
                mensaje: "No se pudo eliminar",
                datos: {}
            });
        }
    }
    )
});

app.put('/actor', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof (req.query.actor_id) == 'undefined' || typeof (req.query.first_name) == 'undefined' || typeof (req.query.last_name) == 'undefined' || typeof (req.query.last_update) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Rellene todos los campos por favor",
            datos: {}
        });
    }
    else {
        sentenciaSQL = `UPDATE ACTOR SET FIRST_NAME = '${req.query.first_name}', LAST_NAME = '${req.query.last_name}', LAST_UPDATE = '${req.query.last_update}' WHERE ACTOR_ID = ${req.query.actor_id}`;
        console.log(sentenciaSQL);
        connection.query(
            sentenciaSQL,
            function (err, results, fields) {
                console.log(results);
                if (results && results.affectedRows == 1) {
                    res.json({
                        status: 1,
                        mensaje: "ACTOR modificado exitosamente",
                        datos: {}
                    });
                } else {
                    res.json({
                        status: 0,
                        mensaje: "Hubo un error al modificar el ACTOR, por favor intenta de nuevo",
                        datos: {}
                    });
                }
            }
        )
    }
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Servidor express corriendo en el puerto ${PORT}`);
});
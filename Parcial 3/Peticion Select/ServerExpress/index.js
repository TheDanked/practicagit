const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.get('/actor',(req,res)=>{
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0625",
    database: "sakila", 
    port: 3306
});

conexion.query("SELECT * FROM actor",
function(err,results,fields){
    console.log(results)
    console.log(fields)
    res.json({results})
    console.log(err)
}
);

});



app.post('/actor',(req,res)=>{
res.json({mensaje: "Server express respondiendo a post"})
});

app.delete('/actor',(req,res)=>{
    res.json({mensaje: "Server express respondiendo a delete"})
});
app.listen(8082,(req,res)=>{
    console.log ("Servidor Express corriendo en puerto 8082");
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/clientes',(req,res)=>{
res.json({mensaje:"Server Express respondiendo a get"});
});

app.post('/clientes',(req,res)=>{
res.json({mensaje: "Server express respondiendo a post"})
});

app.delete('/clientes',(req,res)=>{
    res.json({mensaje: "Server express respondiendo a delete"})
});
app.listen(8082,(req,res)=>{
    console.log ("Servidor Express corriendo en puerto 8082");
});
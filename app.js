//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

//Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'db_libro'
});

connection.connect();

//Configuration
const app = express();

//content JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
app.use(cors());

//Routes
app.get('/api/v1', (req, res)=>{
    res.send("Servicio Iniciado...");
});

app.get('/api/v1/libro', (req, res) =>{
    connection.query('SELECT * FROM libro',  (error, results, fields)  => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/api/v1/libro', (req, res) => {
    console.log(JSON.stringify(req.body));
    connection.query('INSERT INTO db_libro.libro (nombre,autor,isbn) VALUES ( \'' + req.body.nombre + '\',\'' + req.body.autor + '\', \'' + req.body.isbn +'\');', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});


//Server Start
app.listen(3000, () => console.log('WebAPI - Iniciado en el puerto  3000' ));

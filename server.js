const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


const mongodb = require("./src/db/connection");

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./src/routes'));

app.get("/", (req, res) => {
    res.send("¡Welcome to the organics foods API!");
});


mongodb.initDb((err) => {
    if (err) {
        console.error("Error al conectar con MongoDB:", err);
    } else {
        app.listen(port, () => {
            console.log(
                `El servidor está corriendo en el puerto ${port} y la base de datos está conectada.`
            );
        });
    }
});
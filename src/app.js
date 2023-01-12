import express from 'express'
import { BD } from './db.js'
import { PORT } from './config.js'


const app = express() //activamos express al servidor

// insertamos nuestros permisos(cors)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// creamos nuestras urls 
app.get('/', async (req, res) => {
    const rows = await BD.query('SELECT * from peliculas')
    res.json(rows)
})

app.get('/crearPelicula', async (req,res) =>{
    const resultado = await BD.query('INSERT INTO peliculas(nombre) VALUES ("Guerra de las galaxias")')
    res.json(resultado)
})

app.listen(PORT)
console.log('Server en puerto:', PORT)
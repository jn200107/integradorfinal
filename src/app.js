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

app.get('/solicitud',(req,res)=>{
    let mysql='SELECT * FROM solicitudes'

    BD.query(mysql,(err,resuls)=>{
        if(err) throw err
        if (resuls.length>0){
            res.json(resuls)
        } else{
            res.send('no hay datos disponibles')
        }
    })

})



app.post('/nueva-solicitud',(req,res)=>{
    const mysql= 'INSERT INTO solicitudes SET ?'

    const solicitudOBJ={
        idsolicitudes : req.body.idsolicitudes,
        nombre : req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        solicitud: req.body.solicitud,
        comentario: req.body.comentario,
    }

    BD.query(mysql,solicitudOBJ,err=>{
        if (err) throw err

        res.send('solicitud añadida con exito')
    })
})

app.put('/actualizar-solicitud/:id',(req,res)=>{
    const id=req.params
    const {nombre,correo,telefono,solicitud,comentario}= req.body

    const mysql= `UPDATE solicitudes SET nombre ="${nombre}", correo="${correo}", telefono="${telefono}", solicitud="${solicitud}",comentario="${comentario}" where idsolicitudes = ${id.id}`
    
    BD.query(mysql, err =>{
        if (err) throw err

        res.send('solicitud actualizada')
    })
})

app.delete('/eliminar-solicitud/:id',(req,res)=>{
    const id= req.params
    const mysql =`DELETE FROM solicitudes where idsolicitudes = ${id.id} `
    
    BD.query(mysql,err=>{
        if (err) throw err

        res.send ('solicitud eliminada')
    })
})


app.listen(PORT)
console.log('app en puerto:', PORT)
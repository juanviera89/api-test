'use strict'


// ############################################################################################
// ############################## importaciones, requires #####################################
// ############################################################################################

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const schema = mongoose.schema
// const schemaTest = schema ({
//     name: string,
//     tipo: string,
//     id: number
// })

const test = require('./models/test')

// ############################################################################################
// ########################## inicializaciones, configuraciones ###############################
// ############################################################################################

const app = express()
const port = 2509

app.use(bodyParser.urlencoded({extended:false})) //esto para que?
app.use(bodyParser.json())

// mongoose.model('test',schemaTest)


// ############################################################################################
// ########################## ######### Ejecuciones ########### ###############################
// ############################################################################################

app.get('/prueba/gt/:id',(req,res)=>{
    console.log(`has probado el end point /prueba/g con parametros: ${req.params.parm} con tipo de request ${req.method}`)

    test.findOne({id:req.params.id},'',(err,_res)=>{
        if (err) console.log(`hubo un error : ${err}`)
        console.log(`Se ha recupero de la base de datos segun id ${req.params.id} el item ${_res}`)

        res.status(200).send({message: `has probado el end point /prueba/g con parametros: ${req.params.id} con tipo de request ${req.method}`,body : _res})
    })

    
})

app.post('/prueba/p', (req,res)=>{
    console.log('has probado el end point /prueba/p con body')
    console.log(req.body) //no esta funcionando con raw data

    let tmp = new test()

    tmp.name = req.body.name
    tmp.tipo = req.body.tipo
    tmp.id = req.body.id

    
    tmp.save((err,data)=>{
        if(err) throw err
        console.log('guardado en db')
        console.log(data)
    })
    

    res.status(200).send({message: `has probado el end point /prueba/p`, body: req.body}) 

})

mongoose.connect('mongodb://localhost:27017/apiTest',{
    useMongoClient: true},
    (err,res)=>{
    if (err) throw err
    console.log('conectado a mongodb://localhost:27017/apiTest')
    app.listen(port,() => {
    console.log(`Ejecutando API de pruebas en puerto ${port}`)
    })
})


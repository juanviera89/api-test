'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaTest = Schema ({
    name: String,
    tipo: String,
    id: Number
})

module.exports = mongoose.model('test',schemaTest)
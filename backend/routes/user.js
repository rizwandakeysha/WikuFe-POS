//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "uklnodejs"

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const model = require('../models/index');
const user = model.user

//endpoint menampilkan semua data user, method: GET, function: findAll()
app.get("/", auth, (req, res) => {
    user.findAll()
        .then(result => {
            res.json({
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk melihat user berdasarkan id
app.get("/:id_user", (req, res) => {
    let param = { id_user: req.params.id_user }

    user.findOne({ where: param })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//endpoint untuk menyimpan data user, METHOD: POST, function: create
app.post("/", (req, res) => {
    let data = {
        nama_user: req.body.nama_user,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password)
    }

    user.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data user, METHOD: PUT, function:update
app.put("/:id_user", auth, (req, res) => {
    let param = {
        id_user: req.params.id_user
    }
    let data = {
        nama_user: req.body.nama_user,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password)
    }
    user.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data user, METHOD: DELETE, function: destroy
app.delete("/:id_user", auth, (req, res) => {
    let param = {
        id_user: req.params.id_user
    }
    user.destroy({ where: param })
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app
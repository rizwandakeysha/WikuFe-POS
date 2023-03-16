//import express
const express = require("express")

const app = express()
app.use(express.json())


// import md5
const md5 = require("md5")

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const models = require("../models/index")
const menu = models.menu

const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

//config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image/menu")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})

app.get("/", auth, (req, res) => {
    menu.findAll()
        .then(result => {
            res.json({
                menu: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk melihat menu berdasarkan id
app.get("/:id_menu", auth, (req, res) => {
    let param = { id_menu: req.params.id_menu }

    menu.findOne({ where: param })
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

//endpoint untuk menyimpan data menu, METHOD: POST, function: create
app.post("/", upload.single("gambar"), auth, (req, res) => {

    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
    let data = {
        nama_menu: req.body.nama_menu,
        jenis: req.body.jenis,
        deskripsi: req.body.deskripsi,
        gambar: req.file.path,
        harga: req.body.harga
    }
    menu.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted",
                data: result,
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})

app.put("/:id_menu", upload.single("gambar"), auth, (req, res) => {
    let param = { id_menu: req.params.id_menu }
    let data = {
        nama_menu: req.body.nama_menu,
        jenis: req.body.jenis,
        deskripsi: req.body.deskripsi,
        harga: req.body.harga
    }
    if (req.file) {
        // get data by id
        const row = menu.findOne({ where: param })
            .then(result => {
                let oldFileName = result.gambar

                // delete old file
                let dir = path.join(__dirname, "./image/menu", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(error => {
                console.log(error.message);
            })

        // set new filename
        data.gambar = req.file.path
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    menu.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_menu",auth, async (req, res) => {
    try {
        let param = { id_menu: req.params.id_menu }
        let result = await menu.findOne({ where: param })
        let oldFileName = result.gambar

        // delete old file
        let dir = path.join(__dirname, "./image/menu", oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        menu.destroy({ where: param })
            .then(result => {

                res.json({
                    message: "data has been deleted",
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app
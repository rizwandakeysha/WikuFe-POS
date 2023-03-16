//import express
const express = require("express")
const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const auth = require("../auth")

//Endpoint untuk menampilkan semua data transaksi
app.get("/", auth, async (req, res) => {
    let result = await transaksi.findAll({
        include: [
            "user", "meja",
            {
                model: detail_transaksi,
                as: "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json({
        transaksi: result,
        count: result.length
    })
})


//endpoint untuk menampilkan data transaksi berdasarkan id
app.get("/byTransaksi/:id_transaksi", auth, async (req, res) => {
    let param = { id_transaksi: req.params.id_transaksi }
    let result = await transaksi.findOne({
        where: param,
        include: [
            "user", "meja",
            {
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json(result)
})

//endpoint untuk menampilkan data transaksi berdasarkan id user
app.get("/byUser/:id_user", auth, async (req, res) => {
    let param = { id_user: req.params.id_user }
    let result = await transaksi.findAll({
        where: param,
        order: [
            ["id_transaksi", "DESC"],
            ["tgl_transaksi", "DESC"],
        ],
        include: [
            "user", "meja",
            {
                model: models.detail_transaksi,
                as: "detail_transaksi",
                include: ["menu"]
            }
        ]
    })
    res.json(result)
})


//endpoint untuk menambahkan data transaksi baru
app.post("/", auth, async (req, res) => {
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_user: req.body.id_user,
        tgl_transaksi: current,
        id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        status: req.body.status,
        total: req.body.total
    }
    transaksi.create(data)
        .then(result => {
            let lastID = result.id_transaksi
            console.log(lastID);
            detail = req.body.detail_transaksi
            detail.forEach(element => {
                element.id_transaksi = lastID;
            });
            console.log(detail);
            detail_transaksi.bulkCreate(detail)
                .then(result => {
                    res.json({
                        message: "Data has been inserted"
                    })
                })
                .catch(error => {
                    res.json({
                        message: error.message
                    })
                })
        })
        .catch(error => {
            console.log(error.message);
        })
})

// endpoint update data transaksi dan detail_transaksi
app.put("/:id_transaksi", async (req, res) => {
    let current = new Date().toISOString().split("T")[0];
    // Create an object with the new transaksi data from the request body
    let data = {
        id_user: req.body.id_user,
        tgl_transaksi: current,
        id_meja: req.body.id_meja,
        nama_pelanggan: req.body.nama_pelanggan,
        status: req.body.status,
        total: req.body.total
    }
    let id_transaksi = req.params.id_transaksi;
    // Update the transaksi record with the new data
    transaksi.update(data, { where: { id_transaksi: id_transaksi } })
        .then(result => {
            // Get the detail_transaksi data from the request body
            detail = req.body.detail_transaksi
            if (detail.length > 0) {
                // If there are new detail_transaksi records in the request body, delete the existing records for the given id_transaksi
                detail_transaksi.destroy({ where: { id_transaksi: id_transaksi } })
                    .then(() => {
                        // Map the new detail_transaksi data to an array of objects with the required fields
                        let bulkData = detail.map(detailData => {
                            return {
                                id_transaksi: id_transaksi,
                                id_menu: detailData.id_menu,
                                qty: detailData.qty,
                                subtotal: detailData.subtotal
                            };
                        });
                        // Insert the new detail_transaksi records using bulkCreate
                        detail_transaksi.bulkCreate(bulkData)
                            .then(result => {
                                // If the update and insert were successful, send a success response
                                res.json({
                                    message: "Data has been updated"
                                })
                            })
                            .catch(error => {
                                // If there was an error during the insert, send an error response with the error message
                                res.json({
                                    message: error.message
                                })
                            })
                    })
                    .catch(error => {
                        // If there was an error during the delete, send an error response with the error message
                        res.json({
                            message: error.message
                        })
                    })
            } else {
                // If there are no new detail_transaksi records in the request body, send a success response without inserting any new records
                res.json({
                    message: "Data has been updated"
                })
            }
        })
        .catch(error => {
            // If there was an error during the update, log the error message to the console
            console.log(error.message);
        })
})


// endpoint untuk menghapus data transaksi
app.delete("/:id_transaksi", auth, async (req, res) => {
    let param = { id_transaksi: req.params.id_transaksi }
    try {
        await detail_transaksi.destroy({ where: param })
        await transaksi.destroy({ where: param })
        res.json({
            message: "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

module.exports = app
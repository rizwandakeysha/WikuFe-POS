//import
const express = require('express');
const cors = require('cors');
const path = require('path')

//implementasi
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/image/menu', express.static(path.join(__dirname,'./image/menu')))

//endpoint nanti ditambahkan di sini
const user = require('./routes/user');
app.use("/user", user)
const menu = require('./routes/menu');
app.use("/menu", menu)
const meja = require('./routes/meja');
app.use("/meja", meja)
const Login = require('./routes/login');
app.use("/login", Login)
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})
//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "uklnodejs";

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const model = require('../models/index');
const User = model.user

app.post('/', async (req, res) => {
    const schema = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    const result = await User.findOne({ where: schema })
    if (result) {
        const payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token : token
        })
    }else {
        res.json({
            logged : false,
            massage : "invalid username or password" 
        })
    }
})


module.exports = app

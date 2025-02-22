const express = require('express');
const app = express()
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const port = 3000;

const JWT_SECRETE = process.env.JWT_SECRETE;


app.get("/", (req, res) => {
    console.log("API Gateway is running..")
    return res.send("API Gateway is running..")
})

function authToken(req, res, next) {
    console.log(req.headers.authorization)
    const header = req?.headers.authorization;
    const token = header && header.split(' ')[1];

    if (token == null) return res.status(401).json("Please send token");

    jwt.verify(token, JWT_SECRETE, (err, user) => {
        if (err) return res.status(403).json("Invalid token", err);
        req.user = user;
        next()
    })
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json("Unauthorized");
        }
        next();
    }
}

app.use('/order', authToken, authRole('user'), (req, res) => {
    console.log("here")
    proxy.web(req, res, { target: 'http://localhost:3001' });
})
app.use('/product', authToken, authRole('admin'), (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3002' });
})


app.listen(port, () => {
    console.log("API Gateway is running : ", port)
})
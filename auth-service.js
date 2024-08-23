const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config();

app.use(express.json());

const port = 3003


const JWT_SECRETE = process.env.JWT_SECRETE;

const users = [
    { username: 'user', password: '123', role: 'user' },
    { username: 'admin', password: '123', role: 'admin' }
]


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRETE, { expiresIn: '24h' })
        return res.json({ token })
    }
    return res.status(400).send("Invalid user")
})

app.listen(port, ()=>{[
    console.log(`Auth Server is running : `, port)

]})
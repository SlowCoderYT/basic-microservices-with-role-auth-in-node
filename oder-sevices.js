const express = require('express');
const app = express();
const port = 3001


app.get('/view', (req, res) => {

    return res.json([
        { id: 1, product: "This is first product", quantity: 11 },
        { id: 2, product: "This is my anther product", quantity: 5 },
    ])
})

app.listen(port, () => {
    console.log(`Order Server is running : `, port)
})
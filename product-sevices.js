const express = require('express');
const app = express();
const port = 3002


app.get('/view', (req, res) => {

    res.json([
        { id: 1, product: "Apple", quantity: 100 },
        { id: 2, product: "Banana", quantity: 50 },
    ])
})

app.listen(port ,()=>{
    console.log(`Product Server is running : `, port)
})
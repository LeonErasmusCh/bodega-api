const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const dotenv = require('dotenv').config();
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/products', db.getProducts)
app.get('/product/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/product/:id', db.updateProduct)
app.delete('/products/:id', db.deleteProduct)



app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})

  

// Run node index.js for local dev server

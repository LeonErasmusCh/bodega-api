const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const dotenv = require('dotenv').config();
const cors = require('cors')



const app = express()

app.use(cors({
  origin: "*"
}))

const port = process.env.PORT || 3000;

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
app.get('/admin/', db.getAdminById)


app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})

  

// Run node index.js for local dev server
// NOTE: push again when Heroku crashes

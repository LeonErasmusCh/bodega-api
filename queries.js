const dotenv = require('dotenv');
dotenv.config();

const { Client } = require('pg');

const client = new Client({
    connectionString:process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false
    }
  });

client.connect();

// GET all products
const getProducts = (req, res) => {
client.query('SELECT * from products', (err, results) => {
if (err) throw err;
  res.status(200).json(results.rows)
  //client.end();
});
}

// GET product by id
const getProductById = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('SELECT * FROM products WHERE id = $1', [id], (err, results) => {
      if (err) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


// POST a new product
const createProduct = (request, response) => {
    const { productname, category, description, qty } = request.body
  
    client.query('INSERT INTO products (productname, category, description, qty) VALUES ($1, $2, $3, $4)', [productname, category, description, qty], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Product added with ID: ${results.insertId}`)
    })
  }

// PUT update a product
const updateProduct = (request, response) => {
    const id = parseInt(request.params.id)
    const { productname, category, description, qty } = request.body
  
    client.query(
      'UPDATE products SET productname = $1, category = $2, description = $3, qty = $4 WHERE id = $5',
      [productname, category, description, qty, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  // DELETE product by id
  const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id)
  
    client.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }

  

  // get all products /products
  // get product by id /product/1
  // post new product by id /products
  // put update product by id /products

  // hosted url https://bodega-backend-api.herokuapp.com/products
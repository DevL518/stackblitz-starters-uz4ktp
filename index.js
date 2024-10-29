const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let newItem = { productId, name, price, quantity };
  cart.push(newItem); // Add 
  res.json({ cartItems: cart }); // Return 
});

//Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let item = cart.find(item => item.productId === productId);
  res.json({ cartItems: cart });
});

//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter(item => item.productId !== productId);
  res.json({ cartItems: cart });
});

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ totalQuantity });
});

//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

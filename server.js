const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const productList = require('./controllers/productList.js');
const productUpdate = require('./controllers/productUpdate.js');
const isAdmin = require('./util.js')

const db = knex({
  client: 'pg',
  // connection: {
  //   host : '127.0.0.1',   // this means local host. we can change this later
  //   user : 'yinhow', 
  //   password : '',
  //   database : 'boxgreen-db'  	
  // }
  connection: {
  	host: 'boxgreen-db.cvlbedt8lqkc.us-east-2.rds.amazonaws.com',
  	port: '5432',
  	user: 'yinhowlew',
  	password: 'Daisynguyen123',
  	database: 'boxgreen'
  	// connectionString: process.env.DATABASE_URL,
  	// ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req,res) => {
	res.send('this is working'); 
})

app.get("/productlist", (req, res) => {
	productList.handleProductListGet(req, res, db)
})

app.put("/productupdate", isAdmin, (req, res) => { 
	productUpdate.handleProductUpdate(req, res, db)
})

app.post("/productcreate", isAdmin, (req, res) => {
	productUpdate.handleProductCreate(req, res, db)
})

app.delete("/productdelete", isAdmin, (req, res) => {
	productUpdate.handleProductDelete(req, res, db)
})

app.listen(process.env.PORT || 3000, ()=> {
	console.log('app is running on port ${process.env.PORT}');
});



{/*

next steps:
upload pg to AWS first
create production db
then integrate
then upload server
lastly, upload client
how to use google cloud for image??

optional:
frontend validation of form
responsive admin
add quantity? nah, no need to change frontend
handle refresh after delete? now is NOT refreshing 
- window.location.reload() works....but is there a better way? fetch data again after X seconds?


9)  AWS
later:  change your start script in your package.json from
nodemon server.js
To
node server.js



8)  use async/await and try/catch
error is now showing correctly

dev data works fine

7) delete table and create new table
DROP TABLE products;

new:
CREATE TABLE products (id int primary key, title VARCHAR(100) not null, short_desc text not null, description text not null, ingredient text ARRAY, price int not null, promo int not NULL, best int not NULL, quantity int not NULL);
INSERT into products (id, title, short_desc, description, ingredient, price, promo, best, quantity) values (1, 'Test Product', 'short description', 'very long description', array['peanut', 'almond'], 1099, 2, 1, 50);
6)
added a simple middleware to validate admin in server

5)
admin CMS UI
connect CRUD from admin to server via redux action

4)
frontend redux fetch action, change to fetch from the new product endpoint
works!

3)
npm install knex pg cors

import local db:
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',   // this means local host. we can change this later
    user : 'yinhow', 
    password : '',
    database : 'boxgreen-db'  	
  }
});

create a folder called controllers, and add a productList.js file
which does a simple get all products from product table
then create end point in server.js
app.get("/productlist", (req, res) => {
	productList.handleProductListGet(req, res, db)
})
test on your browser:  http://localhost:3000/productlist


2)  DB
createdb "boxgreen-db";
brew services start postgresql
psql boxgreen-db
\d, \q

or in Dbeaver, create new one and connect to boxgreen-db

CREATE TABLE table_name (column_1 datatype, column_2 datatype, column_3 datatype);  // remember ;
INSERT INTO products (id, ingredient) VALUES (1, ARRAY['peanut', 'almond']);  // make sure single-quote only

test: 
CREATE TABLE products (id int, title text, short_desc text, description text, ingredient text ARRAY, price int, promo int, best int);
insert into products (id, title, short_desc, description, ingredient, price, promo, best) values (1, 'Test Product', 'short description', 'very long description', array['peanut', 'almond'], 1099, 2, 1);


1)
in the folder, npm init -y
then npm install nodemon --save-dev
npm install express
npm install body-parser

in package.json, check script to:  "start": "nodemon server.js"
then create a server.js file
then npm start to start nodemon listening

test our Setup:

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get("/", (req,res) => {
	res.send('this is working');    // check on browser


app.listen(3000, ()=> {
	console.log('app is running on port 3000');   // see on Terminal if it is connected
});



*/}
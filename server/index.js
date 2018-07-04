//NOTE: Before anything in your server file, setup your proxy, and main in your package.json file.
//Proxy connects to the port in your backend, and is responsible for connecting frontend to backend.
//Main the main server file, where your express server is initialized.
//Enable your env file and other files with the .env extension.
//Give ability to add variables to node environment.
require('dotenv').config();
//Import express server using require
const express = require('express');
//Create your bodyParser variable middleware that initailizes req.body on all request in your requests, if not the req.body will be undefined.
const bodyParser = require('body-parser');
//Require massive module
const massive = require('massive');
//Import your controller file.
const ctrl = require('./controller');
//Create your app variable that is set to an instance of the express server.
const app = express();
//Define the port your app is listening to.
const PORT = 4000;
//Use the bodyParser middleware json method invoked which will initalize the req.body in express server requests.
app.use(bodyParser.json());

//Invoke the database using the massive and connection string.
massive(process.env.CONNECTION_STRING)
.then(database => {
    //Set the database instance to your express app using app.set('database folder', database instance)
    app.set('db', database);
}).catch(err => console.log('Database Connection Error--------------', err));

//Define your get, post, put, and delete requests, and use your controller methods for each endpoint.
//Gets inventory, use getInventory method on controller file.
app.get('/api/inventory', ctrl.readInventory);

///Post request creates data for the database 
//Accepts an object for the request 
app.post('/api/inventory', ctrl.createInventory);

//Put Request update data using id request parameter.
app.put('/api/inventory/:id', ctrl.updateInventory);

//Delete Request deletes data using id request parameter.
app.delete('/api/inventory/:id', ctrl.deleteInventory);


//Listen on Port and pass a callback as a argument to listen on backend.    
app.listen(PORT, () => console.log('Listening on Port:', PORT));
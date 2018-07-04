module.exports = {
    createInventory(req, res) {
        //Retrieve the database instance from the apps request , using the get method on request to get database instance.
        const dbInstance = req.app.get('db');
        //Destruct the values from teh req.body
        const { name, imageurl, price } = req.body;
        // OR LIKE THIS pass it in a variable
        // let newProduct = {
        //     name,
        //     imageurl,
        //     price
        // }
        //Then run the sql file on the dbINstance with parameters, can be a object or a  array.
        //If object can pass a variable or inline object.
        dbInstance.create_product({ name, imageurl, price })
        .then(products => {
            //We are sending a message to frontend informing the user that we are creating a product. 
            //We are passing a object to our front end, add a property to our data object in frontend.
            res.status(200).json({message: 'Created Product'});
            //if sending back data
            //res.status(200).json({products: products}) OR res.status(200).send(products)
        }).catch(err => console.log('Database Create Product-------------', err));
    },
    readInventory(req, res) {
        //Retrieve the database instance of the app's request get method;
        const dbInstance = req.app.get('db');
        dbInstance.read_products().then(products => {
            //Pass the products from the database to the frontend
            //We will sending object that will add a property our data object in frontend.
            res.status(200).json({products: products});
            //OR 
            //res.status(200).send(product);
        }).catch(err => console.log('Read Products Database Error-----------', err));
    },
    ////////////////////////
    //////////////////////
    //USED WHERE IMPLEMENTING ROUTES!!
    readProduct(req, res) {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        //console.log id to see if it is a valid value.
        console.log('id-----------------------', id);
        //Then run the sql file, insert your id you destructured from req.params to as a argument.
        dbInstance.read_product(id).then(product => {
            res.status(200).json({product: product});
        }).catch(err => console.log('REad Product Database Error------------', err));
    },
    ///////////////////////
    updateInventory(req, res) {
        //Retrieve the database instance from the app request using get method.
        const dbInstance = req.app.get('db');
        //With most updates and delete request you will mostly use requet parameters.
        //Destruct the id from the request params from the url.
        const { id } = req.params;
        //Destruct the data from the request body.
        const { name, imageurl, price } = req.body;
        //Make sure to console.log for testing purposes
        console.log('-----------req.body------', req.body);
        //Pass the id and the data from the request body.
        //Can use an inline object or assign it to a variable.
        // const updatedProduct = {
        //  id, 
        //  name, imageurl,
        //  price   
        // }
        //Can pass object or an array.
        dbInstance.update_product({ id: +id, name, imageurl, price: +price })
        .then(products => {
            res.status(200).json({message: 'Updated Product!'});
            //If sending data back pass an object or just send it.
            //res.status(200).json({products: products}) OR res.status(200).send(products);
            //Make sure to have a catch for axios and database calls to catch errors.
        }).catch(err => console.log('Update Product Database Error---------', err));
    },
    deleteInventory(req, res) {
        //Retrieve the database instance from the app request using get method.
        const dbInstance = req.app.get('db');
        //With most updates and delete request you will mostly use requet parameters.
        //Destruct the id from the request params from the url.
        const { id } = req.params;
        //Just pass the since it is a single parameter, if it is more than one, need to pass a object or array.
        dbInstance.delete_product(+id)
        .then(products => {
            res.status(200).json({message: 'Delete Product!'});
            //If sending data back pass an object or just send it.
            //res.status(200).json({products: products}) OR res.status(200).send(products);
            //Make sure to have a catch for axios and database calls to catch errors.
        }).catch(err => console.log('Delete Product Database Error-----------', err));
    }

}
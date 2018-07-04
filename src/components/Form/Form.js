import React, { Component } from 'react';
//Make sure to import axios to initiate change.
import axios from 'axios';

export default class Form extends Component {


    //For each button to prven 
    addToInventory() {
        //Destruct the data from your state, that you will be inserting as the req.body in your controller file.
        const { imageurl, name, price } = this.props;
        //Can pass a object or a variable
        //let obj = {
        // imageurl,
        // name,
        // price
        //}
        //Do a axios request on your endpoint
        //Just pass a inline object or asssign it to a variale 

        // let newProduct = { 
        //     imageurl,
        //     name, 
        //     price
        // }
        
        axios.post('/api/inventory', {imageurl, name, price})
        .then(res => {
            //Clear the input fields
            this.props.cancel();
            //Then reRender the lists.
            this.props.reRender();
            //Since just getting messsage just alert that your created a product.
            alert(res.data.message);
            //Make sure when doing axios request or database calls make a catch, to catch any errors!
        }).catch(err => console.log('Axios Post Error--------------', err));
    }

    render() {
        //Destruct the values from state.
        const { id, imageurl, name, price, doEdit } = this.props;
        return (
            <div>
                <form>
                    <img src={imageurl} alt={name} />
                    <h3>Image URL: </h3>
                    <input type='text' onChange={e => this.props.handleImageChange(e.target.value)} value={imageurl}/>
                    <h3>Product Name: </h3>
                    <input type='text' onChange={e => this.props.handleNameChange(e.target.value)} value={name}/>
                    <h3>Price: </h3>
                    <input type='text' onChange={e => this.props.handlePriceChange(e.target.value)} value={price}/>
                </form>
                <button onClick={e => this.props.cancel(e)}>Cancel</button>
                <button onClick={e => doEdit ? this.props.editProduct(id) : this.addToInventory(e)}>{doEdit ? 'Save' : 'Add To Inventory'}</button>
            </div>
        );
    }
}
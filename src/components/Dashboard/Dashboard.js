import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';

export default class Dashboard extends Component {
   //In the case of delete you would to pass it to dashboard that's it.
    //Use arrow function so there would be no need to bind it, since it is not refering to it's parent context.
    delete = (id) => {
        //Use an delete request to delete a current product.
        axios.delete(`/api/inventory/${id}`)
        .then(res => {
            //Since the input fields ARE NOT EFFECTED there is no need to clear it.
            //Just reRender the list, and alert the user they deleted a product.
            this.props.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Delete Product Axios Error--------------', err));
    } 

    render() {
        //Destructure the props from the App.js 
        const { displayList } = this.props;
        return (
            <div>
                Dashboard
                {/* Make sure when mapping over an array make sure to use a key attribute on each element*/}
                {/* To pass all properties of an object at once  to a component through props use the spread operator before item*/}
                {/*If the list has data map over the array. */}
                {displayList && displayList.map((item, i) => <div key={i}><Product {...item} deleteProduct={this.delete} setEdit={this.props.setEdit}/></div>)} 
                {/* OR THIS */}
                {/*
                 displayList.map((item, i) => <div key={i}><Product name={item.name} imageurl={item.imageurl} price={item.price} /></div>)
                */}
                
            </div>
        );
    }
}
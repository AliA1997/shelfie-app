import React, { Component } from 'react';
// import logo from './logo.svg';
//Import the needed components 
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import './App.css';
//Import axios for making calls to your backend, which initiate controller method within the controller, calling the database to run a sql file, in which the 
//sql file returns data, which we use in the front end to use. 
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
        ///Use dummy data to test app.
        //Comment it out if you don't need it.
        list: [
            {
                name: 'Cat 404',
                price: 12,
                imageurl: 'https://http.cat/404'
            },
            {
                name: 'Cat 300',
                price: 10,
                imageurl: 'https://http.cat/300'
            },
            {
                name: 'Cat 500', 
                price: 6,
                imageurl: 'https://http.cat/500'
            }
        ],
        //Afterwards get data from database, can uncommment this out.....
        // list: []
        //Optional:
        //
        id: '',
        imageurl: '',
        name: '',
        price: ''
    }
}
//All axios calls are initiated in componentDidMount
componentDidMount() {
    axios.get('/api/inventory')
    .then(res => {
        //Can send data from database in a form of a object or..
        this.setState({list: res.data.products});
        //just send the data.
        // this.setState({list: res.data})
    })
    //NOTE: FOR EVERY SINGLE axios call and database call USE A CATCH!!!!!!!
    //NOTE: FOR EVERY SINGLE axios call and database call USE A CATCH!!!!!!!
    .catch(err => console.log('Get Products Axios Error---------', err));
}
/////This is the reRender functiion, which updates the list by performing an axios call.
reRender = () => {
    axios.get(`/api/inventory`)
    .then(res => {
        this.setState({list: res.data.products});
    }).catch(err => console.log('reRender Error--------------', err));
}
//Define the method you are gonna pass down to dashboard and form to delete and edit a product.
//In the case  of edit you would to pass it in to dashboard and form component.
//Define your method that will handleChanges in input elements.
handleImageChange = (val) => {
    this.setState({imageurl: val});
}
handleNameChange = (val) => {
    this.setState({name: val});        
}
handlePriceChange = (val) => {
    this.setState({price: val});        
}
//clears the input fields
cancel = (e) => {
    this.setState({
        imageurl: '',
        name: '',
        price: '',
        doEdit: false
    })
}
//Set the doEdit state to true, therefore enable all the state to be set to a current product.
setEdit = (id) => {
    //Copy the array.
    const copyOfArr = this.state.list.slice();
    //Then filter the array based on the id passed by product.
    //We are gonaa get the first value, since we do not want an array.
    let filteredProduct = copyOfArr.filter(product => product.id === id)[0];
    //THen updated state, therefore in turn update the input fields with the products values.
    this.setState({
        id: id, // OR filteredProduct.id
        name: filteredProduct.name,
        price: filteredProduct.price,
        imageurl: filteredProduct.imageurl,
        doEdit: true
    });
}
//If  the doEdit state is true, update that product using the id from state.
//NOTE id state CANNOT be edited.
editProduct = () => {
    const { doEdit, id, imageurl, name, price } = this.state; 
    //If the doEdit is true, which is based on if the input fields has a products data.
    console.log('doEdit---------------', doEdit);
    if(doEdit) {
        //Can put just an inline object.
        //OR just assign it to a variable.
        
        // let updatedProduct = {
        //     id, 
        //     imageurl, 
        //     name,
        //     sprice
        // }

        axios.put(`/api/inventory/${id}`, { imageurl, name, price })
        .then(res => {
            //During the put axios request clear the fields, reRender the list, and alert the user that they just edited a product.
            this.cancel();
            this.reRender();
            alert(res.data.message);
        }).catch(err => console.log('Update Product Axios Error------------', err));
    } else {
        this.setState({doEdit: true});
    }
}

  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard displayList={this.state.list} setEdit={this.setEdit} reRender={this.reRender}/>
        {/* Pass the values and the methods handdle the changes in the input field */}
        <Form  name={this.state.name} price={this.state.price}  imageurl={this.state.imageurl} cancel={this.cancel} doEdit={this.state.doEdit} reRender={this.reRender}
        handleNameChange={this.handleNameChange} handlePriceChange={this.handlePriceChange} handleImageChange={this.handleImageChange} editProduct={this.editProduct}/>
      </div>
    );
  }
}

export default App;

import React from 'react';

const Product = (props) => {
    //Destruct props 
    //Note from props, NOT this.props, becuase it is not a class.
    const { id, name, imageurl, price } = props;
    return (
        <div className='product'>
            <img src={imageurl} alt={name} />
            <p>{name}</p>
            <p>{price}</p>
            {/*Retrieve the delete and edit method from props to delete or edit current Product.*/}
            <button onClick={() => props.deleteProduct(id)}>Delete</button>
            <button onClick={() => props.setEdit(id)}>Edit</button>
        </div>
    );
};

export default Product;
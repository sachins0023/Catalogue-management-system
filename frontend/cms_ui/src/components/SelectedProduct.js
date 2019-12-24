import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewCategory.css';

class SelectedProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: null
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/product/'+params.id)
        .then(res => {
            const product = res.data;
            console.log(product);
            this.setState({
                currentProduct: product
            });
        });
    }

    render() {
        return (
            <div className="box">
                {this.state.currentProduct ? (
                    <div className="content">

                <Link className="btn" to="/">Back</Link>
                        <div className="product-item-breadcrumb">
                        {this.state.currentProduct.category.get_breadcrumbs.map((item,index) =>(
                            <span className="breadcrumb-item" key={index} >
                                <span onClick={(event,item) => this.updateProductListFromProduct(event,index)}>
                                    {' / '.repeat(index)}{item}
                                </span>
                            </span>
                        ))}
                    </div>
                    <div className="product-area-details">
                        Name: {this.state.currentProduct.name}
                    </div>
                    <div className="product-area-details">
                        Brand: {this.state.currentProduct.brand.name}
                    </div>
                    <div className="product-area-details">
                        Category: {this.state.currentProduct.category.name}
                    </div><div className="product-area-details">
                        Parent Category: {this.state.currentProduct.category.parent_category ? this.state.currentProduct.category.parent_category.name : ''}
                    </div>
                    <div className="product-area-details">
                        Specification: {this.state.currentProduct.specifications.length ? this.state.currentProduct.specifications.map((item,index) => (
                                            <ul className="specifications" key={index} >
                                                &emsp;<li >{item.key}: {item.value} {(item.units)?(item.units):('')}</li> 
                                            </ul>
                                        )) : null}
                    </div>
                    </div>
                ) : null }
            </div>
        )
    }
}

export default SelectedProduct;
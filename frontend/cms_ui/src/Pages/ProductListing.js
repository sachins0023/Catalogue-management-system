import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            categoryList: [],
            brandList: [],
            currentProduct: [],
        };
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/product/`)
          .then(res => {
            const products = res.data;
            this.setState({ productList: products});
          })
        axios.get(`http://127.0.0.1:8000/category/`)
            .then(res => {
                const categories = res.data;
                this.setState({ categoryList: categories});
            })
        axios.get(`http://127.0.0.1:8000/brand/`)
            .then(res => {
                const brands = res.data;
                this.setState({ brandList: brands});
            })
        
    }
    accessProduct(event, index) {
        axios.get(`http://127.0.0.1:8000/product/`+String(index)+'/')
        .then(res => {
            const product = res.data;
            this.setState({ currentProduct: product});
        })
    }
    
    updateProductListByCategory(event,index) {
        let newProductList = [];
        axios.get(`http://127.0.0.1:8000/product/`)
        .then(res => {
            const products = res.data;
            for(let i=0;i<products.length;i++) {
                if (products[i].category.id === index) {
                    newProductList = [...newProductList, products[i]];
                }
            }
            this.setState({ productList: newProductList});
        })
    }

    updateProductListByBrand(event,index) {
        let newProductList = [];
        axios.get(`http://127.0.0.1:8000/product/`)
        .then(res => {
            const products = res.data;
            for(let i=0;i<products.length;i++) {
                if (products[i].brand.id === index) {
                    newProductList = [...newProductList, products[i]];
                }
            }
            this.setState({ productList: newProductList});
        })
    }

    updateProductListFromProduct(event, item) {
        let newProductList = [];
        axios.get(`http://127.0.0.1:8000/product/`)
        .then(res => {
            const products = res.data;
            for(let i=0;i<products.length;i++) {
                if (products[i].category.name === this.state.currentProduct.category.get_breadcrumbs[item]) {
                    newProductList = [...newProductList, products[i]];
                }   
            }
            this.setState({ productList: newProductList});
        })
    }

    openCategoryCreator() {
        return(
            <div className="category-creator">
                
            </div>
        )
    }

    render() {
        return (
        <div className="ProductListing">
            <h1 className="heading">
                Catalogue Management System
            </h1>
            <div className="creation-centre">
                <Link to="/category/new" className="category-create-button">
                    Create new category
                </Link>
                <Link to='/brand/new' className="Brand-create-button">
                    Create new brand
                </Link>
                <Link to='/product/new' className="Product-create-button">
                    Create new product
                </Link>
            </div>  
            {(this.state.currentProduct.name)?
            (<div className="product-item">
                <h2 className="product-item-heading">
                    Product Selected
                </h2>
                <div className="product-area">
                    <div className="product-item-breadcrumb">
                        {this.state.currentProduct.category.get_breadcrumbs.map((item,index) =>(
                            <div className="breadcrumb-item" key={index} >
                                <div onClick={(event,item) => this.updateProductListFromProduct(event,index)}>
                                    {'>'.repeat(index)}{item}
                                </div>
                            </div>
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
                <button className="close-button" onClick={() => (this.setState({currentProduct: []}))}>Close</button>
            </div>):('')
            }
            <div className="total-content">
                <div className="product-content">
                    <div className="product-heading">
                        Products
                    </div>
                    <table>
                        <thead>
                            <tr>
                            <th className="product details">Product name</th>
                            <th className="product details">Brand</th>
                            <th className="product details">Category</th>
                            <th className="product details">Parent Category</th>
                            <th className="product details">Breadcrumb</th>
                            <th className="product details">Specifications</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.productList.map((item,index) => (
                            <tr className="individual-row" key={index}>
                                    <td className="cell" onClick={(event, index) => this.accessProduct(event,item.id)}> 
                                        {item.name}                                       
                                    </td>
                                    <td className="cell">                                      
                                        {item.brand.name}                                      
                                    </td>
                                    <td className="cell">                                       
                                        {item.category.name}                                        
                                    </td>
                                    <td className="cell">                                        
                                        {item.category.parent_category ? item.category.parent_category.name : null}                                        
                                    </td>
                                    <td className="cell">                                       
                                        {item.category.get_breadcrumbs.join('/')+'/'}                                    
                                    </td>
                                    <td className="cell">                                       
                                        {item.specifications.length ? item.specifications.map((item,index) => (
                                            <div className="specifications" key={index}>
                                                {item.key}: {item.value} {(item.units)?(item.units):('')} 
                                            </div>
                                        )) : null}                                        
                                    </td>
                            </tr>))}
                        </tbody>
                    </table>
                    
                </div>
                 <div className="category-content">
                    <div className="category-heading">
                        Categories
                    </div>
                <ul>
                    {this.state.categoryList.map((item,index) => (
                        <div className="individual-item" onClick={(event, index) => this.updateProductListByCategory(event, item.id)} key={index}>
                            {item.name}
                        </div>
                    )
                    )}
                </ul>
                </div>
                <div className="brand-content">
                    <div className="brand-heading">
                        Brands
                    </div>
                <ul>
                    {this.state.brandList.map((item,index) => (
                        <div className="individual-item" onClick={(event, index) => this.updateProductListByBrand(event, item.id)} key={index}>
                            {item.name}
                        </div>
                    )
                    )}
                </ul>
                </div> 
            </div>
            
        </div>
        );
    }
}

export default ProductListing;
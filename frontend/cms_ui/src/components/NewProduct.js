import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import '../styles/NewCategory.css';

class  NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            categoryList: [],
            brandList: [],
            category: null,
            specifications: [],
            spec_key: '',
            spec_value: '',
            spec_unit: ''
        };
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/category/`)
        .then(res => {
            const categories = res.data;
            this.setState({ categoryList: categories});
        });
        axios.get(`http://127.0.0.1:8000/brand/`)
        .then(res => {
            const brands = res.data;
            this.setState({ brandList: brands});
        });
    }

    renderCategoryWithPath(pathList) {
        return pathList.map((item, index, arr) => (
            item + (index !== (arr.length-1) ? ' / ' : '')
        ));
    }

    renderCategories() {
        return this.state.categoryList.map((item, index) => (
        <option key={index} value={item.id}>{this.renderCategoryWithPath(item.get_breadcrumbs)}</option>
        ));
    }

    renderBrands() {
        return this.state.brandList.map((item, index) => (
        <option key={index} value={item.id}>{item.name}</option>
        ));
    }

    submitProduct() {
        const newName = this.state.name;
        const category = this.state.category;
        const brand = this.state.brand;
        const specifications = this.state.specifications;
        axios.post(`http://127.0.0.1:8000/product/`, {
            name: newName,
            category: category,
            brand: brand,
            specifications: specifications
        }).then(res => {
            if(res.status === 201) {
                console.log(res.data);
                history.push('/');
            }
        });
    }

    addSpec() {
        const key = this.state.spec_key;
        const value = this.state.spec_value;
        const unit = this.state.spec_unit;
        if (key && value) {
            const specifications = [...this.state.specifications, {key: key, value: value, unit: unit}];
            this.setState({
                specifications: specifications,
                spec_key: '',
                spec_unit: '',
                spec_value: ''
            });
        }
    }

    render() {
        return (
            <div className="box">
                <h1>
                    Create a new Product
                </h1>
                <div className="content">
                    <div>
                        <label>
                            {'Product Name : '}
                            <input onChange={(event) => this.setState({ name: event.target.value })} type="text" placeholder="Product Name" />
                        </label>
                    </div>
                    <div>
                        <label>
                            {'Category : '}
                            <select onChange={(event) => this.setState({ category: event.target.value })}>
                                <option value="0">Select a category</option>
                                {this.renderCategories()}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            {'Brand : '}
                            <select onChange={(event) => this.setState({ brand: event.target.value })}>
                                <option value="0">Select a brand</option>
                                {this.renderBrands()}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            {'Specifications : '}
                            <input value={this.state.spec_key} onChange={(event) => this.setState({ spec_key: event.target.value })} type="text" placeholder="Key" />
                            <input value={this.state.spec_value} onChange={(event) => this.setState({ spec_value: event.target.value })} type="text" placeholder="Value" />
                            <input value={this.state.spec_unit} onChange={(event) => this.setState({ spec_unit: event.target.value })} type="text" placeholder="Unit (Optional)" />
                            <button onClick={() => this.addSpec()}>Add</button>
                        </label>
                    </div>
                    <div>
                        {this.state.specifications.map((item, index) => (
                            <div key={index}>
                                {item.key + ' ' + item.value + ' ' + item.unit}
                            </div>
                        ))}
                    </div>
                    <div>
                        <button className="btn" onClick={() => this.submitProduct()}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  NewProduct;
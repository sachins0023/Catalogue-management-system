import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import '../styles/NewCategory.css';
import { Link } from 'react-router-dom';

class NewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentCategory: null,
            newCategory: null
        };
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/category/`)
        .then(res => {
            const categories = res.data;
            this.setState({ categoryList: categories});
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

    submitCategory() {
        const newName = this.state.newCategory;
        const parentId = this.state.parentCategory;
        axios.post(`http://127.0.0.1:8000/category/`, {
            name: newName,
            parent_category: parentId
        }).then(res => {
            if(res.status === 201) {
                history.push('/');
            }
        });
    }

    render() {
        return (
            <div className="box">
                <h1>
                    Create a new Category
                </h1>
                <div className="content">
                    <div>
                        <label>
                            {'Parent Category : '}
                            <select onChange={(event) => this.setState({ parentCategory: event.target.value })}>
                                <option value="0">Select a parent category</option>
                                {this.renderCategories()}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            {'Category Name : '}
                            <input onChange={(event) => this.setState({ newCategory: event.target.value })} type="text" placeholder="Category Name" />
                        </label>
                    </div>
                    <div>
                    <Link className="btn" to="/">Back</Link>
                        <button className="btn" onClick={() => this.submitCategory()}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewCategory;
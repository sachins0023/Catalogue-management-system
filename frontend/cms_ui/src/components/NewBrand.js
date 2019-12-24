import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import '../styles/NewCategory.css';

class NewBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null
        };
    }

    submitBrand() {
        const newName = this.state.name;
        axios.post(`http://127.0.0.1:8000/brand/`, {
            name: newName
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
                    Create a new Brand
                </h1>
                <div className="content">
                    <div>
                        <label>
                            {'Brand Name : '}
                            <input onChange={(event) => this.setState({ name: event.target.value })} type="text" placeholder="Brand Name" />
                        </label>
                    </div>
                    <div>
                        <button className="btn" onClick={() => this.submitBrand()}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewBrand;
import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
//import border from '../foodBorder.jpg';
import axios from 'axios';
import Recipe from './Recipe.js'

export default class recipeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [], isFavor: false};
    }

    componentDidMount() {

        const name = this.props.location.state.name;
        axios.get('http://localhost:8000/recipeDisplay/' + name).then(res => {
            this.setState({ recipes: res.data });
        })
        .catch((err) => {
            console.log(err);
        })

        axios.get('http://localhost:8000/favorites/' + name).then(res => {
            this.setState({isFavor: res.data})
            //console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    getRecipes() {
        return this.state.recipes.map(currRecipe => {
            return <Recipe recipe={currRecipe} key={currRecipe.name} fav = {this.state.isFavor}/>;
        })
    }
    render() {
        return (
            <div>
                {this.getRecipes()}
            </div>
        )
    }
}
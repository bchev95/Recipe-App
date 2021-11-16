import React, {Component} from 'react';
import axios from 'axios';
import border from '../foodBorder.jpg';
import { Link } from 'react-router-dom';

export default class recipeSearch extends Component {
    constructor(props){
        super(props);

        this.whenTimeModified = this.whenTimeModified.bind(this);
        this.whenIngredientModified = this.whenIngredientModified.bind(this);
        this.submission = this.submission.bind(this);

        this.state ={
            time: '',
            ingredient: ''
        }
    }

    whenTimeModified(thisObject){
        this.setState({
            time: thisObject.target.value
        });
    }

    whenIngredientModified(thisObject) {
        this.setState({
            ingredient: thisObject.target.value
        });
    }

    submission(thisObject){
        thisObject.preventDefault();

        const recipeRequest = {
            time: this.state.time,
            ingredient: this.state.ingredient,
        }

        console.log("recipe request = " +recipeRequest);

        axios.post('http://localhost:8000/possibleRecipes', recipeRequest)
        .catch(function(err){
            console.log(err.response);
        });
    }

    render() {
        return (
            <div style={{backgroundImage: `url(${border})`, backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', overflow: 'hidden', resizeMode: 'center', paddingBottom: 400}}>
                <div style={{paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100}}>
                    <div style={{paddingBottom: 5}}>
                        <button style={{ paddingLeft: 30, paddingRight: 30 }} className="btn btn-secondary mr-1" onClick={()=> window.history.back()}>
                            Back
                        </button>
                    </div>      
                    <h3 style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 30, fontStyle: 'italic', backgroundColor: 'lightblue', marginBottom: 0, paddingTop: 50}}>Request a Recipe</h3>
                    <form style={{backgroundColor: 'lightblue', paddingLeft: 100, paddingRight: 100, paddingBottom: 400}} onSubmit={this.submission}>
                        <div style={{paddingTop: 20}} className="form-group">
                            <label>Amount of Time You Can Cook (minutes):</label>
                            <input type="text" className="form-control" value={this.state.time} onChange={this.whenTimeModified}/>
                        </div>
                        <div className="form-group">
                            <label>Main Ingredient:</label>
                            <input type="text" className="form-control" value={this.state.ingredient} onChange={this.whenIngredientModified}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', paddingTop: 10}} className="form-group">
                            <Link to={{pathname: '/possibleRecipes', state: {ingredient: this.state.ingredient}}}>
                                <input style={{paddingLeft: 20, paddingRight: 20}} type="submit" value="Find Me a Recipe" className="btn btn-secondary"/>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
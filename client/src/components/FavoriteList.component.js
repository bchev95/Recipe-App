import React, {Component} from 'react'
import axios from 'axios';
import border from '../foodBorder.jpg';
import { Link } from 'react-router-dom'

const Recipe = props => (
    <tr>
        <td>{props.recipe.name}</td>
        <td>{props.recipe.cookingTime}</td>
        <td>
        <Link to={{pathname: '/recipeDisplay', state: {name: props.recipe.name}}}>
            <button type ="button" className = "btn btn-primary">
                View
            </button>
        </Link>
        </td>
        <td>
        <input type="submit" value="Delete" onClick={() => {props.deleteFavorite(props.recipe.name)}} className="btn btn-danger"/>
        </td>
    </tr>
)

export default class FavoriteList extends Component {
   constructor(props)
   {
       super(props);
       this.deleteFavorite = this.deleteFavorite.bind(this)
       this.state = {recipes: []};
   }

    componentDidMount(){

        axios.get('http://localhost:8000/favorites').then(res => {
            
            this.setState({recipes: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    getFavoriteList(){
       if(this.state.recipes.length === 0){ return <div style={{paddingLeft: 300, paddingRight: 300, paddingBottom: 100, paddingTop: 100, fontFamily: 'sans-serif', fontSize: 20}}>
           You have no favorite recipes yet!
       </div>}
       else {
        return this.state.recipes.map(currRecipe => {
            return <Recipe recipe={currRecipe} handleClick={this.handleClick} deleteFavorite={this.deleteFavorite} key={currRecipe.name}/>;
        })
       }   
    }
    deleteFavorite(name)
    {
        axios.delete('http://localhost:8000/favorites/'+ name).then(res=>console.log(res.data)).catch((err) => {console.log(err.response)});

       this.setState({
            recipes: this.state.recipes.filter(el =>el.name !== name)
        })
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
                    <h3 style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 30, fontStyle: 'italic', backgroundColor: 'lightblue', marginBottom: 0, paddingTop: 20, paddingBottom: 20}}>My Favorite Recipes</h3>
                    <div style={{paddingLeft: 50, paddingRight: 50, paddingBottom: 480, backgroundColor: 'lightblue'}}>
                    <table className = "table table-hover">
                        <thead className = "thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Cooking Time (minutes)</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: 'white'}}>
                            {this.getFavoriteList()}
                        </tbody>
                    </table>
                    </div>
                </div>      
            </div>     
        )
    }
}
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import border from '../foodBorder.jpg';
import axios from 'axios';


const Recipe = props => (
    <div className="col-sm-4 mt-5">
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{props.recipe.name}</h5>
            <p className="card-text">Cooking Time: {props.recipe.cookingTime} minutes</p>
            <Link to={{pathname: '/recipeDisplay', state: {name: props.recipe.name}}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button style={{background: 'brown', color: 'white', paddingLeft: 30, paddingRight: 30, paddingTop: 10, paddingBottom: 10}} type ="button">
                        View
                    </button>
                </div>
                        
            </Link>
        </div>
    </div>
  </div>
)

export default class possibleRecipes extends Component {
  constructor(props)
  {
      super(props);
      this.state = {recipes: []};
  }

   componentDidMount(){
     
       const searchTerm = this.props.ingredient;
      
       axios.get('http://localhost:8000/possibleRecipes/' + searchTerm).then(res => {
           this.setState({recipes: res.data})
       })
       .catch((err) => {
           console.log(err);
       })
   }
   getRecipes(){
       if(this.state.recipes.length === 0){ return <div style={{paddingLeft: 550, paddingRight: 50, paddingBottom: 50, paddingTop: 100, fontFamily: 'sans-serif', fontSize: 20}}>
           Sorry, no recipes match your search criteria!
       </div>}

    return this.state.recipes.map(currRecipe => {
      return <Recipe recipe={currRecipe}  key={currRecipe.name}/>;
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
            
                <h3 style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 30, fontStyle: 'italic', backgroundColor: 'lightblue', marginBottom: 0, paddingTop: 20, paddingBottom: 20}}>Possible Recipes</h3>
                <div style={{paddingLeft: 30, paddingRight: 30, paddingBottom: 400, backgroundColor: 'lightblue'}}>
                    <div className="row">
                        {this.getRecipes()}
                    </div>
                </div>
            </div>      
        </div>     
    )
}
}
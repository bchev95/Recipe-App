import React, {useState} from 'react';
//import { Link } from 'react-router-dom'
import border from '../foodBorder.jpg';
import axios from 'axios';


const Recipe = (props) => {
    
    const [isFavorite, setIsFavorite] = useState(false);

    const addToFavorites = async (recipeId) => {
        axios.post('http://localhost:8000/favorites/' + recipeId).then(res => {
            console.log("Added to favorites");
        })
        .catch((err) => {
            console.log(err);
        })
        setIsFavorite(true);
    }

    const removeFromFavorites = async (name) => {
        axios.delete('http://localhost:8000/favorites/'+ name).then(res=>{
            console.log("Deleted from favorites")
        })
        .catch((err) => {
           console.log(err.response)
        });
        setIsFavorite(false);
    }

    return (
        <div style={{backgroundImage: `url(${border})`, backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', overflow: 'hidden', resizeMode: 'center', paddingBottom: 400}}>
            <div style={{ paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 }}>
                <div style={{paddingBottom: 5}}>
                    <button style={{ paddingLeft: 30, paddingRight: 30 }} className="btn btn-secondary mr-1" onClick = {() => window.history.back()}>
                    Back
                    </button>

                    {(isFavorite)
                    ? (<button style={{ paddingLeft: 30, paddingRight: 30 }} className="btn btn-primary mr-1" onClick = {() => removeFromFavorites(props.recipe.name)}> 
                        Added to favorites 
                    </button>)
                    : (<button style={{ paddingLeft: 35, paddingRight: 35 }} className="btn btn-secondary mr-1" onClick = {() => addToFavorites(props.recipe._id)}>
                        Add to Favorites
                    </button>)
                    }
                </div>
                
                <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 30, fontStyle: 'italic', backgroundColor: 'lightblue', marginBottom: 0, paddingTop: 50, paddingBottom: 50 }}>{props.recipe.name} ({props.recipe.cookingTime} Minutes)</h3>
                <div style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 400, backgroundColor: 'lightblue', whiteSpace: 'pre-line' }}>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Ingredients</h5>
                                    <p className="card-text">{props.recipe.ingredients}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Instructions</h5>
                                    <p className="card-text">{props.recipe.instructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;

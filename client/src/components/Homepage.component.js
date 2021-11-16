import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import logo from '../recipeBook.jpg';
import border from '../foodBorder.jpg';


export default class homePage extends Component {
    
    render(){
        return (
            <div style={{backgroundImage: `url(${border})`, backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat', overflow: 'hidden', resizeMode: 'cover', paddingBottom: 480}}>
                <div style={{paddingLeft: 200, paddingRight: 200, paddingBottom: 25, paddingTop: 100}}>
                    <h1 style={{display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 50, fontStyle: 'italic', backgroundColor: 'transparent', marginBottom: 0, paddingTop: 20, paddingBottom: 20}}>My Recipe Book</h1>
                <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'transparent'}}>
                    <img src={logo} alt="Logo" width="450" height="596"/>
                </div>
                <div style={{paddingTop: 20}}></div>
                <div style={{display: 'flex', justifyContent: 'center' , backgroundColor: 'transparent'}}>
                    <Link to="/recipeSearch">
                        <button style={{background: 'brown', color: 'white', paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}} type ="button">
                            Get a New Recipe!
                        </button>
                    </Link>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 20, backgroundColor: 'transparent'}}>
                    <Link to="/favorites">
                        <button style={{background: 'brown', color: 'white', paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}} type ="button">
                            My Favorites
                        </button>
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}
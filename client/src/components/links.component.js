import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return(
            <nav className ="navbar navbar-dark bg-dark navbar-expand-lg" style={{position: 'fixed', top: 0, width: '100%'}}>
                <Link to="/" className="navbar-brand">Recipe App Home</Link>
                <div className="collapse navbar-collapse">
                <ul className="nav nav-pills">       
                    <li className="navbar-item active">
                    <Link to="/favorites" style={{color: 'DeepSkyBlue'}} className="nav-link">Favorites</Link>
                    </li>
                    <li className="navbar-item active">
                    <Link to="/recipeSearch" style={{color: 'DeepSkyBlue'}} className="nav-link">Get a new Recipe</Link>
                    </li>
                </ul>    
                </div>
            </nav>
        );
    }
}

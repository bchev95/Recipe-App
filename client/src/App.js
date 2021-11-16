import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Links from "./components/links.component"
import FavoriteList from "./components/FavoriteList.component";
import RecipeSearch from "./components/recipeSearch.component";
import HomePage from "./components/Homepage.component";
import './App.css';
import PossibleRecipes from "./components/possibleRecipes.component"
import RecipeDisplay from './components/recipeDisplay.component';

class App extends Component {
  render() {
    return (
      <Router>
      <Links />
      <Routes>
        <Route path = "/" exact element ={<HomePage />}></Route>
        <Route path = "/favorites" element={<FavoriteList />}></Route>
        <Route path = "/recipeSearch" element={<RecipeSearch />}></Route>
        <Route path = "/possibleRecipes" element={<PossibleRecipes />}></Route>
        <Route path = "/recipeDisplay" element={<RecipeDisplay />}></Route>
      </Routes>
      </Router>
    );
  }
}

export default App;

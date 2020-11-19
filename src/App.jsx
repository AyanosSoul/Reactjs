import React, { useState } from "react";
import "./css/App.css";
import recipeAPI from "./config/keys";
import { v4 as uuidv4 } from "uuid";

//My components
import Recipe from "./components/Recipe";

const App = () => {
  // lo mismo que React Native
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Función para recoger las recetas de la api
  const fetchRecipes = async () => {
    try {
      const response = await fetch(recipeAPI(query));
      const data = await response.json();
      console.log(data);
      setRecipes(data.hits);
    } catch (error) {
      console.log(error);
    }
    setQuery("");
  };

  // Función para llamar a la api, y que
  // no se recargue la pag cuando se haga.
  const Submit = (event) => {
    // preveer que recargue la pag entera
    event.preventDefault();
    fetchRecipes();
  };

  // Funnción para ir cambiando el State de la query
  const Changer = (event) => {
    // event.target.value es un listener para
    // cuando cambie el texto.
    // can prove with console.log
    setQuery(event.target.value);
  };

  // Vista principal
  return (
    <div className="App">
      <h1>Recetas</h1>
      <form className="searchForm" onSubmit={Submit}>
        <input
          type="text"
          placeholder="¿Qué quieres preparar hoy?"
          autoComplete="off"
          onChange={Changer}
          value={query}
        />
        <input type="submit" value="Buscar" />
      </form>
      <div className="recipes">
        {/* Si el arreglo de recetas no está vacío, se mapea. */}
        {/* condición && (lo que pasa si true) */}
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;

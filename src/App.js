
import React, {useState,useEffect} from 'react';
import './App.css';
import Recipe from './recipe';

const App = () => {
  

  
  const [recipes,setRecipes]= useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery]=useState('')
  
  useEffect(() => {
    getRecipes();
  },[query]);
  

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    

  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search)
  }
    
 return(
   <div className='App'>
     
     <form onSubmit={getSearch}className='search-form'>
       <input 
       className='search-bar' 
       type='text'
       value={search}
       onChange={updateSearch}>
         
       </input>
       <button className='search-button' type="submit">Search</button>
     </form>
     <div className='recipes'>
     {recipes.map(recipe => (
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients} />
     ))};
     </div>
   </div>

 );
}

export default App;

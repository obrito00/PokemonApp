import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import PokemonProfile from './PokemonProfile';
import Footer from './Footer'; 
import './App.css';


function App() {
  return (

    <div className="App">
      <Router>
      <Header /> 
        <main className="content">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:pokemonName" element={<PokemonProfile />} />
          </Routes>
          
        </main>
        <Footer /> {}
      </Router>
    </div>
  ); 
}

export default App;

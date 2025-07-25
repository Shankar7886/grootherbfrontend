
import './App.css';
import Header from './components/header/headers';
import Hero from './components/HeroSection';
import CharacterProfile from './components/PlantDetail';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
     <div className="App">
      <Header /> 
      <div className="main-content" >      
         <Hero/>
      </div>
       <CharacterProfile  />
    </div>
  );
}

export default App;

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import ParticleComponent from './Components/particles';

function App() {
   return (
    <div className="App">
      <Navbar/>
      <ParticleComponent className="particles"/>
      <Login/>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail';
import DogCreate from './components/DogCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/home"element={<Home/>}/>
        <Route exact path= '/home/:id'element={<Detail/>}/>
        <Route exact path='/dogs/'element={<DogCreate/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

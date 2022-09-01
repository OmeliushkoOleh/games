import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import TopBar from './components/TopBar';
import Game1 from './components/Game1';



function App() {

  

  return (
    <div>
      <BrowserRouter>
        <div className="App">
        <TopBar></TopBar>


        <Routes>
          <Route path="/game_1"   element={<Game1></Game1>} />



        </Routes>


        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

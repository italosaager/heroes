import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesComponent from './routes/RoutesComponent';
import Header from './components/header/Header';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <RoutesComponent />
    </BrowserRouter>

  )
}

export default App

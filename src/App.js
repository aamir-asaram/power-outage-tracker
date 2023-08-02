import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProvinceList from './components/ProvinceList';
import Details from './components/Details';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProvinceList />} />
        <Route path="/:province" element={<Details />} />
      </Routes>

    </>
  );
}

export default App;

import './App.css'
import Main from './pages/Main';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/addtoken" element={<AddToken />} />
      <Route exact path="/edittoken" element={<EditToken />} />
    </Routes>
  )
}

export default App

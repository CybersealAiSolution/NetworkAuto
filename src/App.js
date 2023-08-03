import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Signin from './components/Signin/Signin';
import Callback from './components/Callback';
import CreateDefaultTenant from './components/CreateDefaultTanent/CreateDefaultTenant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
         <Route path='/' exact element={<Signin/>} /> 
         <Route path='/callback' exact element={<Callback/>} /> 
         <Route path='/createdefaulttenant'exact element={<CreateDefaultTenant/>}/> 
         <Route path='/dashboard/*' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Signin from './components/Signin/Signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
          {/* signin page */}
         <Route path='/' exact element={<Signin/>} /> 
         {/* <Route path='/createdefaulttenant'exact element={<CreateDefaultTenant/>}/>  */}
         <Route path='/dashboard/*' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;

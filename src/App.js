import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Signin from './components/Signin/Signin';
import Callback from './components/Callback';
import CreateDefaultTenant from './components/CreateDefaultTanent/CreateDefaultTenant';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
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

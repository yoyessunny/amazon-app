import React,{useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProducts from './components/AddProducts';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import ProductListScreen from './screens/ProductListScreen';
import Footer from './components/Footer';
import CompetitorListScreen from './screens/CompetitorListScreen';

const App = () => {

  const loginname = useSelector((state) => state.loginName);

  useEffect(() => {
    if ((loginname) && (window.location.href !== 'http://localhost:3000/')) {
      window.location.replace('/')
    }
  }, [loginname]);

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar />
      <Sidebar />
      <div style={{marginLeft:"160px"}}>
                { loginname ?
                (<>
                  <Routes>
                <Route path="/" exact={true} element={<ProductListScreen/>} />
                <Route path="/competitors/:id" exact={true} element={<CompetitorListScreen/>} />
                <Route path="/add" exact={true} element={<AddProducts/>} />
                </Routes>
                <Footer />
                </>)
                :   
                <Routes>
                <Route path="/" exact={true} element={<Login/>} />
                </Routes>
                }
                <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot" element={<Forgot/>} />
              <Route path="/register" element={<Register/>} />
                </Routes>
      </div>
      </BrowserRouter>
      <ToastContainer position='bottom-center'/>
    </div>
  )
}

export default App;
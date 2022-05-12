import React,{useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import ProductListScreen from './screens/ProductListScreen';
import TrashProductListScreen from './screens/TrashProductListScreen';
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
    <div>
      <BrowserRouter>
      <Navbar />
                { loginname ?
                (<>
                  <Routes>
                <Route path="/" exact={true} element={<ProductListScreen/>} />
                <Route path="/competitors/:id" exact={true} element={<CompetitorListScreen/>} />
                <Route path="/trashproductlist" element={<TrashProductListScreen/>} />
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
      </BrowserRouter>
      <ToastContainer position='bottom-center'/>
    </div>
  )
}

export default App;
import React from 'react';
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
import EditProducts from './components/EditProducts';
import OrdersScreen from './screens/OrdersScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import SingleOrderScreen from './screens/SingleOrderScreen';
import Cookies from 'js-cookie';

const App = () => {

  var loginname = useSelector((state) => state.loginName);

  if(loginname === ""){
    loginname = Cookies.get("loginname");
  }

  // useEffect(() => {
  //   if ((loginname) && (window.location.href !== 'http://localhost:3000/')) {
  //     window.location.replace('/')
  //   }
  // }, [loginname]);

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar />
      <Sidebar />
      <div style={{marginLeft:"120px"}}>
                { loginname ?
                (<>
                  <Routes>
                <Route path="/" exact={true} element={<ProductListScreen/>} />
                <Route path="/edit/:id" exact={true} element={<EditProducts/>} />
                <Route path="/add" exact={true} element={<AddProducts/>} />
                <Route path="/orders" exact={true} element={<OrdersScreen/>} />
                <Route path="/orders/:id" exact={true} element={<SingleOrderScreen/>} />
                <Route path="/payments" exact={true} element={<PaymentsScreen/>} />
                </Routes>
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
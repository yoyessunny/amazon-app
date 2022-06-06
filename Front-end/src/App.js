import React,{useEffect,useReducer} from 'react';
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
import PaymentTable from './components/PaymentTable';
import axios from 'axios';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import ShipmentScreen from './screens/ShipmentScreen';
import AddShipments from './components/AddShipments';
import EditShipments from './components/EditShipments';

const reducer = (state, action) => {
  switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true};
      case 'FETCH_SUCCESS':
        return {
           ...state, 
           items: action.payload, 
           loading: false
          };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload};
      default:
        return state
  }
}  

const App = () => {

  const [{ loading, error, items }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async() => {
        try{
            dispatch({type: 'FETCH_REQUEST'});
            const {data} = await axios.get('http://localhost:5000/payment');
            dispatch({type: 'FETCH_SUCCESS', payload: data});
        }catch(err){
          dispatch({type: 'FETCH_FAIL', payload: err.message});
        }
    }
    fetchData();
  },[]);


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
                <Route path="/" exact={true} element={<HomeScreen/>} />
                <Route path="/product" exact={true} element={<ProductListScreen/>} />
                <Route path="/edit/:id" exact={true} element={<EditProducts/>} />
                <Route path="/add" exact={true} element={<AddProducts/>} />
                <Route path="/orders" exact={true} element={<OrdersScreen/>} />
                <Route path="/orders/:id" exact={true} element={<SingleOrderScreen/>} />
                <Route path="/payments" exact={true} element={<PaymentsScreen items={items} loading={loading} error={error} />} />
                <Route path="/payments/order" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Order" />} />
                <Route path="/payments/adjustment" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Adjustment" />} />
                <Route path="/payments/fbainventoryfee" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="FBA Inventory Fee" />} />
                <Route path="/payments/refund" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Refund" />} />
                <Route path="/payments/servicefee" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Service Fee" />} />
                <Route path="/payments/taxwithheld" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Tax Withheld" />} />
                <Route path="/payments/transfer" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Transfer" />} />
                <Route path="/payments/other" exact={true} element={<PaymentTable items={items} loading={loading} error={error} viewType="Other" />} />
                <Route path="/inventory" exact={true} element={<InventoryScreen/>} />
                <Route path="/shipment" exact={true} element={<ShipmentScreen/>} />
                <Route path="/addShipment" exact={true} element={<AddShipments/>} />
                <Route path="/editShipment/:id" exact={true} element={<EditShipments/>} />
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
import React, { useEffect, useReducer } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {toast} from 'react-toastify';

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

const OrdersScreen = () => {
    const { TabPane } = Tabs;

    const [{ loading, error, items }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
    });

    
    useEffect(() => {
      const fetchData = async() => {
          try{
              dispatch({type: 'FETCH_REQUEST'});
              const {data} = await axios.get('http://localhost:5000/order');
              dispatch({type: 'FETCH_SUCCESS', payload: data});
          }catch(err){
            dispatch({type: 'FETCH_FAIL', payload: err.message});
          }
      }
      fetchData();
    },[]);

    const readExcel = (file) => {
      const promise = new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload=(e)=>{
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray,{type:'buffer'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          var data = XLSX.utils.sheet_to_json(ws);
          data = JSON.stringify(data);
          var matchArray = data.match( /\D\-\D/gm,"_");
          for(let matchArrayIndex=0;matchArrayIndex<matchArray.length;matchArrayIndex++){
            let underscoreReplace = matchArray[matchArrayIndex].replace("-","_");
            data = data.replace(matchArray[matchArrayIndex],underscoreReplace);
          }
          data = JSON.parse(data);
          resolve(data);
        };
        fileReader.onerror=(error)=>{
          reject(error);
        };
      });

      promise.then((d)=>{
        axios.post('http://localhost:5000/orderimport',d)
          .then(function (response) {
            console.log(response);
            toast.success("Orders Added");
          })
          .catch(function (error) {
            console.log(error);
          });

      });
    };

    

  return (
    <div className='container'>
       <h1>Orders</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="View" key="1">
        {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (      
        <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}}>
          <thead>
            <tr>
              <th scope="col" className="col-sm-2">Order ID</th>
              <th scope="col" className="col-sm-2">Merchant Order ID</th>
              <th scope="col" className="col-sm-2">Purchase Date</th>
              <th scope="col" className="col-sm-2">Last Updated Date</th>
              <th scope="col" className="col-sm-2">Order Status</th>
              <th scope="col" className="col-sm-2">Fulfillment Channel</th>
              <th scope="col" className="col-sm-2">Sales Channel</th>
              <th scope="col" className="col-sm-2">Order Channel</th>
              <th scope="col" className="col-sm-2">URL</th>
              <th scope="col" className="col-sm-2">Ship Service Level</th>
              <th scope="col" className="col-sm-4">Product Name</th>
              <th scope="col" className="col-sm-2">SKU</th>
              <th scope="col" className="col-sm-2">ASIN</th>
              <th scope="col" className="col-sm-2">Item Status</th>
              <th scope="col" className="col-sm-2">Quantity</th>
              <th scope="col" className="col-sm-2">Currency</th>
              <th scope="col" className="col-sm-2">Item Price</th>
              <th scope="col" className="col-sm-2">Item Tax</th>
              <th scope="col" className="col-sm-2">Shipping Price</th>
              <th scope="col" className="col-sm-2">Shipping Tax</th>
              <th scope="col" className="col-sm-2">Gift Wrap Price</th>
              <th scope="col" className="col-sm-2">Gift Wrap Tax</th>
              <th scope="col" className="col-sm-2">Item Promotion Discount</th>
              <th scope="col" className="col-sm-2">Ship Promotion Discount</th>
              <th scope="col" className="col-sm-2">Ship City</th>
              <th scope="col" className="col-sm-2">Ship State</th>
              <th scope="col" className="col-sm-2">Ship Postal Code</th>
              <th scope="col" className="col-sm-2">Ship Country</th>
              <th scope="col" className="col-sm-2">Promotion Id's</th>
              <th scope="col" className="col-sm-2">Is Business Order</th>
              <th scope="col" className="col-sm-2">Purchase Order Number</th>
              <th scope="col" className="col-sm-2">Price Designation</th>
              <th scope="col" className="col-sm-2">Fulfilled By</th>
              <th scope="col" className="col-sm-2">Is Iba</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((d,index)=>{
              return(
                <tr key={index}>
                  <td>{d.amazon_order_id}</td>
                  <td>{d.merchant_order_id}</td>
                  <td>{d.purchase_date}</td>
                  <td>{d.last_updated_date}</td>
                  <td>{d.order_status}</td>
                  <td>{d.fulfillment_channel}</td>
                  <td>{d.sales_channel}</td>
                  <td>{d.order_channel}</td>
                  <td>{d.url}</td>
                  <td>{d.ship_service_level}</td>
                  <td>{d.product_name}</td>
                  <td>{d.sku}</td>
                  <td>{d.asin}</td>
                  <td>{d.item_status}</td>
                  <td>{d.quantity}</td>
                  <td>{d.currency}</td>
                  <td>{d.item_price}</td>
                  <td>{d.item_tax}</td>
                  <td>{d.shipping_price}</td>
                  <td>{d.shipping_tax}</td>
                  <td>{d.gift_wrap_price}</td>
                  <td>{d.gift_wrap_tax}</td>
                  <td>{d.item_promotion_discount}</td>
                  <td>{d.ship_promotion_discount}</td>
                  <td>{d.ship_city}</td>
                  <td>{d.ship_state}</td>
                  <td>{d.ship_postal_code}</td>
                  <td>{d.ship_country}</td>
                  <td>{d.promotion_ids}</td>
                  <td>{d.is_business_order}</td>
                  <td>{d.purchase_order_number}</td>
                  <td>{d.price_designation}</td>
                  <td>{d.fulfilled_by}</td>
                  <td>{d.is_iba}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )
        }
        </TabPane>
        <TabPane tab="Import" key="2">        
            <div>
                <input type="file" onChange={(e)=>{const file = e.target.files[0]; readExcel(file);}} />
            </div>
        </TabPane>
        <TabPane tab="Export" key="3">
        Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OrdersScreen;
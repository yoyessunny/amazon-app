import React, { useEffect, useReducer, useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {toast} from 'react-toastify';
import PaymentTable from '../components/PaymentTable';

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

const PaymentsScreen = () => {
    const { TabPane } = Tabs;

    const [{ loading, error, items }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
    });

    const [updateFlag, setUpdateFlag] = useState(false);
    const [file, setFile] = useState(null);

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
    },[updateFlag]);

    const readExcel = () => {
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
          data = data.replace(/\\r|\\n|\\t/gm,"");
          data = JSON.parse(data);
          resolve(data);
        };
        fileReader.onerror=(error)=>{
          reject(error);
        };
      });

      promise.then((d)=>{
        console.log(d);
        axios.post('http://localhost:5000/paymentimport',d)
          .then(function (response) {
            console.log(response);
            toast.success(response.data);
            setUpdateFlag(!updateFlag);
          })
          .catch(function (error) {
            console.log(error);
          });

      });
    };

    

  return (
    <div className='container'>
       <h1>Payments</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Order" key="1">
          <PaymentTable loading={loading} error={error} items={items} viewType="Order" />
        </TabPane>
        <TabPane tab="Adjustment" key="2">
          <PaymentTable loading={loading} error={error} items={items} viewType="Adjustment" />
        </TabPane>
        <TabPane tab="FBA Inventory Fee" key="3">
          <PaymentTable loading={loading} error={error} items={items} viewType="FBA Inventory Fee" />
        </TabPane>
        <TabPane tab="Refund" key="4">
          <PaymentTable loading={loading} error={error} items={items} viewType="Refund" />
        </TabPane>
        <TabPane tab="Service Fee" key="5">
          <PaymentTable loading={loading} error={error} items={items} viewType="Service Fee" />
        </TabPane>
        <TabPane tab="Tax Withheld" key="6">
          <PaymentTable loading={loading} error={error} items={items} viewType="Tax Withheld" />
        </TabPane>
        <TabPane tab="Transfer" key="7">
          <PaymentTable loading={loading} error={error} items={items} viewType="Transfer" />
        </TabPane>
        <TabPane tab="Other Type" key="8">
          <PaymentTable loading={loading} error={error} items={items} viewType="Other" />
        </TabPane>
        <TabPane tab="Import" key="9">        
            <div className='d-flex'>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                <button onClick={readExcel} className="btn btn-primary">Upload</button>
            </div>
        </TabPane>
        <TabPane tab="Export" key="10">
        Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PaymentsScreen;
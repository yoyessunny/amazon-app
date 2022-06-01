import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {toast} from 'react-toastify';
import PaymentTable from '../components/PaymentTable';

// const reducer = (state, action) => {
//   switch (action.type) {
//       case 'FETCH_REQUEST':
//         return { ...state, loading: true};
//       case 'FETCH_SUCCESS':
//         return {
//            ...state, 
//            items: action.payload, 
//            loading: false
//           };
//       case 'FETCH_FAIL':
//         return { ...state, loading: false, error: action.payload};
//       default:
//         return state
//   }
// }

const PaymentsScreen = (props) => {
    const { TabPane } = Tabs;

    // const [{ loading, error, items }, dispatch] = useReducer(reducer, {
    //   loading: true,
    //   error: '',
    // });

    const [updateFlag, setUpdateFlag] = useState(false);
    const [file, setFile] = useState(null);

    // useEffect(() => {
    //   const fetchData = async() => {
    //       try{
    //           dispatch({type: 'FETCH_REQUEST'});
    //           const {data} = await axios.get('http://localhost:5000/payment');
    //           dispatch({type: 'FETCH_SUCCESS', payload: data});
    //       }catch(err){
    //         dispatch({type: 'FETCH_FAIL', payload: err.message});
    //       }
    //   }
    //   fetchData();
    // },[updateFlag]);

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
       <h1 style={{position:"sticky",top:"65px",backgroundColor:"white",zIndex:"10"}}>Payments</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="View" key="1">
        <PaymentTable items={props.items} loading={props.loading} error={props.error} viewType="All" />
        </TabPane>
        <TabPane tab="Import" key="2">        
            <div className='d-flex'>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                <button onClick={readExcel} className="btn btn-primary">Upload</button>
            </div>
        </TabPane>
        <TabPane tab="Export" key="3">
        Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PaymentsScreen;
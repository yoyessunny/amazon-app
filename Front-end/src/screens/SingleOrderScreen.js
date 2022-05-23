import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true};
        case 'FETCH_SUCCESS':
          return {
             ...state, 
             orderData: action.payload,  
             loading: false
            };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload};
        case 'FETCH_PAY_REQUEST':
          return { ...state, loadingPay: true};
        case 'FETCH_PAY_SUCCESS':
          return {
             ...state, 
             orderPayment: action.payload,  
             loadingPay: false
            };
        case 'FETCH_PAY_FAIL':
          return { ...state, loadingPay: false, errorPay: action.payload};
        default:
          return state
    }
}

const SingleOrderScreen = () => {

    const [{ loading, error, orderData, loadingPay, orderPayment}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const params = useParams();
    const {id} = params;

    const [orderID, setOrderID] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`http://localhost:5000/order/${id}`);
                dispatch({type: 'FETCH_SUCCESS', payload: data});
                setOrderID(data.amazon_order_id);
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    },[id]);

    useEffect(()=>{
        const fetchDataPay = async() => {
            try{
                dispatch({type: 'FETCH_PAY_REQUEST'});
                const {data} = await axios.get(`http://localhost:5000/orderpayment/${orderID}`);
                console.log(data);
                dispatch({type: 'FETCH_PAY_SUCCESS', payload: data});
            }catch(err){
                dispatch({type: 'FETCH_PAY_FAIL', payload: err});
            }
        }
        fetchDataPay();
    },[orderID]);

    const Total_sales = orderPayment && orderPayment.map(item => item.Total_sales).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const TCS_CGST = orderPayment && orderPayment.map(item => item.TCS_CGST).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const TCS_SGST = orderPayment && orderPayment.map(item => item.TCS_SGST).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const TCS_IGST = orderPayment && orderPayment.map(item => item.TCS_IGST).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const selling_fees = orderPayment && orderPayment.map(item => item.selling_fees).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const fba_fees = orderPayment && orderPayment.map(item => item.fba_fees).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const other_transaction_fees = orderPayment && orderPayment.map(item => item.other_transaction_fees).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const other = orderPayment && orderPayment.map(item => item.other).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
    const total = orderPayment && orderPayment.map(item => item.total).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);

  return (
    <div className='container'>
        {loading && <div>Loading...</div>}

        {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
           <> 
           <h1>Order</h1>
            <Row>
                <Col md={12}>
                        <div className="d-flex justify-content-between">
                            <p>Amazon Order ID:</p> 
                        <p>{orderData.amazon_order_id}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Merchant Order ID:</p> 
                        <p>{orderData.merchant_order_id}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                           <p>Purchase Date:</p>  
                        <p>{orderData.purchase_date}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                         <p>Last Updated Date:</p>    
                        <p>{orderData.last_updated_date}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                         <p>Order Status:</p>    
                        <p>{orderData.order_status}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Product Name:</p>   
                          <p> {orderData.product_name}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                          <p> SKU: </p> 
                         <p>{orderData.sku}</p>   
                        </div>
                        <div className="d-flex justify-content-between">
                          <p> ASIN:</p>  
                         <p> {orderData.asin}</p>  
                        </div>
                        <div className="d-flex justify-content-between">
                          <p> Item Status:</p>  
                          <p> {orderData.item_status}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                         <p>Quantity:</p>    
                        <p>{orderData.quantity}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                           <p>Item Price:</p>  
                          <p> {orderData.item_price}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Item Tax:</p> 
                          <p>{orderData.item_tax}</p>  
                        </div>
                        <div className="d-flex justify-content-between">
                           <p>Shipping Price:</p>  
                         <p> {orderData.shipping_price}</p>  
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Shipping Tax:</p>  
                          <p> {orderData.shipping_tax}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Total Sales:</p>  
                          <p> {Total_sales}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> TCS CGST:</p>  
                          <p className='text-danger'> {TCS_CGST}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> TCS SGST:</p>  
                          <p className='text-danger'> {TCS_SGST}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> TCS_IGST:</p>  
                          <p className='text-danger'> {TCS_IGST}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Selling Fees:</p>  
                          <p className='text-danger'> {selling_fees}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> FBA Fees:</p>  
                          <p className='text-danger'> {fba_fees}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Other Transaction Fees:</p>  
                          <p className='text-danger'> {other_transaction_fees}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Other:</p>  
                          <p> {other}</p> 
                        </div>
                        <div className="d-flex justify-content-between">
                           <p> Total:</p>  
                          <p> {total}</p> 
                        </div>
                </Col>
            </Row>    
           </> 
        )}
            <br/>
            <br/>
            <br/> 
        <h3>Payments</h3>

        {loadingPay && <div>Loading...</div>}
        <table className="table" style={{overflowX: 'scroll !important', whiteSpace: 'nowrap',}}>
          <thead>
            <tr>
              <th scope="col" className="col-sm-2">Date/Time</th>
              <th scope="col" className="col-sm-2">settlement id</th>
              <th scope="col" className="col-sm-2">type</th>
              <th scope="col" className="col-sm-2">order id</th>
              <th scope="col" className="col-sm-2">Sku</th>
              <th scope="col" className="col-sm-2">description</th>
              <th scope="col" className="col-sm-2">quantity</th>
              <th scope="col" className="col-sm-2">marketplace</th>
              <th scope="col" className="col-sm-2">account type</th>
              <th scope="col" className="col-sm-2">fulfillment</th>
              <th scope="col" className="col-sm-4">order city</th>
              <th scope="col" className="col-sm-2">order state</th>
              <th scope="col" className="col-sm-2">order postal</th>
              <th scope="col" className="col-sm-2">product sales</th>
              <th scope="col" className="col-sm-2">shipping credits</th>
              <th scope="col" className="col-sm-2">promotional rebates</th>
              <th scope="col" className="col-sm-2">Total sales</th>
              <th scope="col" className="col-sm-2">TCS CGST</th>
              <th scope="col" className="col-sm-2">TCS SGST</th>
              <th scope="col" className="col-sm-2">TCS IGST</th>
              <th scope="col" className="col-sm-2">selling fees</th>
              <th scope="col" className="col-sm-2">fba fees</th>
              <th scope="col" className="col-sm-2">other transaction fees</th>
              <th scope="col" className="col-sm-2">other</th>
              <th scope="col" className="col-sm-2">total</th>
            </tr>
          </thead>
          <tbody>

        {
               orderPayment && orderPayment.map((d, index)=>{
                   return (<tr key={index}>
                    <td>{d.date_time}</td>
                    <td>{d.settlement_id}</td>
                    <td>{d.type}</td>
                    <td>{d.order_id}</td>
                    <td>{d.Sku}</td>
                    <td>{d.description}</td>
                    <td>{d.quantity}</td>
                    <td>{d.marketplace}</td>
                    <td>{d.account_type}</td>
                    <td>{d.fulfillment}</td>
                    <td>{d.order_city}</td>
                    <td>{d.order_state}</td>
                    <td>{d.order_postal}</td>
                    <td>{d.product_sales}</td>
                    <td>{d.shipping_credits}</td>
                    <td>{d.promotional_rebates}</td>
                    <td>{d.Total_sales}</td>
                    <td>{d.TCS_CGST}</td>
                    <td>{d.TCS_SGST}</td>
                    <td>{d.TCS_IGST}</td>
                    <td>{d.selling_fees}</td>
                    <td>{d.fba_fees}</td>
                    <td>{d.other_transaction_fees}</td>
                    <td>{d.other}</td>
                    <td>{d.total}</td>
                  </tr>);
               }) 
        }
        </tbody>
        </table>
    </div>
  )
}

export default SingleOrderScreen;
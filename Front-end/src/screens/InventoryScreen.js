import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true};
        case 'FETCH_SUCCESS':
          return {
             ...state, 
             inventoryData: action.payload,  
             loading: false
            };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload};
        default:
          return state
    }
}

const InventoryScreen = () => {

    const [{ loading, error, inventoryData}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    useEffect(()=>{
        const fetchData = async() => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`http://localhost:5000/inventory`);
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    },[]);


    return (
    <div className='container'>
        <h3>Inventory</h3>
        {loading && <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>}
        {error && <div>{error}</div>}
        <table className="table">
        <thead>
            <tr>
            <th scope="col" className="col-sm-2">SKU</th>
            <th scope="col" className="col-sm-2">ASIN</th>
            <th scope="col" className="col-sm-4">Product Name</th>
            <th scope="col" className="col-sm-2">Stock on FBA</th>
            <th scope="col" className="col-sm-2">Stock on MFN</th>
            </tr>
        </thead>
        <tbody>
        {
            inventoryData && inventoryData.map((d, index)=>{
                return (<tr key={index}>
                    <td>{d.SKU}</td>
                    <td>{d.ASIN}</td>
                    <td>{d.Product_Name}</td>
                    <td>{d.Stock_on_FBA}</td>
                    <td>{d.Stock_on_MFN}</td>
                </tr>);
            }) 
        }
        </tbody>
        </table>
    </div>
  )
}

export default InventoryScreen;
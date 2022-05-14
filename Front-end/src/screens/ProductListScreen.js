import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true};
        case 'FETCH_SUCCESS':
          return {
             ...state, 
             products: action.payload, 
             loading: false
            };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload};
        default:
          return state
    }
}

const ProductListScreen = () => {

    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const {data} = await axios.get('http://localhost:5000/product');
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            }catch(err){

            }
        }
        fetchData();
    },[]);


  return (
    <div>
        <Row>
            <Col>
        <h1>Products</h1>
            </Col>
            <Col className='col text-end'>
                <div>
                    <Button type="primary" onClick={()=> navigate('/add')}>
                        Add Product
                    </Button>
                </div>
            </Col>
        </Row>

        {loading && <div>Loading...</div>}

        {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
           <>
           <table className='table'>
               <thead>
                   <tr>
                       <th class="col-sm-2">SKU</th>
                       <th class="col-sm-4">NAME</th>
                       <th class="col-sm-2">PRICE</th>
                       <th class="col-sm-2">ASIN</th>
                       <th class="col-sm-2">ACTIONS</th>
                   </tr>
               </thead>
               <tbody>
                   {
                        products && products.map((item, index) => {
                            return (<> {(!item.delete_flag)?(
                                <tr key={index}>                                
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                    <td>{item.product_asin}</td>
                                    <td>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=> navigate(`/competitors/${item._id}`)}
                                        >
                                            View
                                        </Button>
                                        &nbsp;
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=> navigate(`/competitors/${item._id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ):""}</>);
                          })
                   }
               </tbody>
           </table>
           </> 
        )}

    </div>
  )
}

export default ProductListScreen;
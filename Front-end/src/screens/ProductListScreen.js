import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import ProductTable from '../components/ProductTable';

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
        <Row style={{position:'sticky',top:'65px',backgroundColor:'white'}}>
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

        {loading && <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>}

        {
        loading ?   <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
        : 
        error ? <div>{error}</div>
        : (
           <>             
           <ProductTable items={products} />
           </> 
        )}

    </div>
  )
}

export default ProductListScreen;
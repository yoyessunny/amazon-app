import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true};
        case 'FETCH_SUCCESS':
          return {
             ...state, 
             products: action.payload, 
             page: action.payload.page, 
             pages: action.payload.pages, 
             loading: false
            };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload};
        case 'DELETE_REQUEST':
          return { ...state, loadingDelete: true, successDelete: false};
        case 'DELETE_SUCCESS':
          return {
             ...state, 
             loadingDelete: false,
             successDelete: true,
            };
        case 'DELETE_FAIL':
          return { ...state, loadingDelete: false, successDelete: false};
        case 'DELETE_RESET':
          return { ...state, loadingDelete: false, successDelete: false};
        default:
          return state
    }
}

const ProductListScreen = () => {

    const [{ loading, error, products, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
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
        if(successDelete){
            dispatch({type: 'DELETE_RESET'});
        }else{
            fetchData();
        }
    },[successDelete]);

    const deleteHandler = async(product) => {
        if(window.confirm('Are you sure to delete?')) {
            try{
                await axios.delete(`http://localhost:5000/productdelete/${product._id}`);
                toast.success("Product Deleted");
                dispatch({type: 'DELETE_SUCCESS'});
            } catch(err){
                toast.error(err);
                dispatch({type: 'DELETE_FAIL'});
            }
        }
    }

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        const registerHandler = async() => {
                try{
                    await axios.post('http://localhost:5000/productregister');
                    toast.success("Product Added");
                    // dispatch({type: 'DELETE_SUCCESS'});
                } catch(err){
                    toast.error(err);
                    // dispatch({type: 'DELETE_FAIL'});
                }
        }
        registerHandler();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

  return (
    <div>
        <Row>
            <Col>
        <h1>Products</h1>
            </Col>
            <Col className='col text-end'>
                <div>
                    <Button type="primary" onClick={showModal}>
                        Add Product
                    </Button>
                </div>
            </Col>
        </Row>

        {loadingDelete && <div>Loading...</div>}

        {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
           <>
           <table className='table'>
               <thead>
                   <tr>
                       <th>NAME</th>
                       <th>PRICE</th>
                       <th>ASIN</th>
                       <th>ACTIONS</th>
                   </tr>
               </thead>
               <tbody>
                   {
                        products && products.map((item, index) => {
                            return (<> {(!item.delete_flag)?(
                                <tr key={index}>                                
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                    <td>ASIN#</td>
                                    <td>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=> navigate(`${item._id}`)}
                                        >
                                            View
                                        </Button>
                                        &nbsp;
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=> deleteHandler(item)}
                                        >
                                            Delete
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

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
    </div>
  )
}

export default ProductListScreen;
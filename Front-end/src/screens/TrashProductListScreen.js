import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import Button from 'react-bootstrap/Button';

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
        case 'RESTORE_REQUEST':
          return { ...state, loadingDelete: true, successDelete: false};
        case 'RESTORE_SUCCESS':
          return {
             ...state, 
             loadingDelete: false,
             successDelete: true,
            };
        case 'RESTORE_FAIL':
          return { ...state, loadingDelete: false, successDelete: false};
        case 'RESTORE_RESET':
          return { ...state, loadingDelete: false, successDelete: false};
        default:
          return state
    }
}

const TrashProductListScreen = () => {

    const [{ loading, error, products, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

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
            dispatch({type: 'RESTORE_RESET'});
        }else{
            fetchData();
        }
    },[successDelete]);

    const restoreHandler = async(product) => {
        if(window.confirm('Are you sure to restore?')) {
            try{
                await axios.delete(`http://localhost:5000/productrestore/${product._id}`);
                toast.success("Product Restored");
                dispatch({type: 'RESTORE_SUCCESS'});
            } catch(err){
                toast.error(err);
                dispatch({type: 'RESTORE_FAIL'});
            }
        }
    }

  return (
    <div>
        <h1>Trash</h1>
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
                       <th>ID</th>
                       <th>NAME</th>
                       <th>PRICE</th>
                       <th>ACTIONS</th>
                   </tr>
               </thead>
               <tbody>
                   {
                        products && products.map((item, index) => {
                            return (<>{(item.delete_flag)?(
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                    <td>
                                        <Button
                                        type='button'
                                        variant='light'
                                        onClick={()=> restoreHandler(item)}
                                        >
                                            Restore
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

export default TrashProductListScreen;
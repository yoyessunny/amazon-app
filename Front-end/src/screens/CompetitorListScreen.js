import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true};
        case 'FETCH_SUCCESS':
          return {
             ...state, 
             competitorData: action.payload,  
             loading: false
            };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload};
        default:
          return state
    }
}

const CompetitorListScreen = () => {

    const [registerAsin, setRegisterAsin] = useState("");
    const [registerFlag, setRegisterFlag] = useState(false);

    const [{ loading, error, competitorData}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const fetchData = async() => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`http://localhost:5000/competitor/${id}`);
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            }catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }
        fetchData();
    },[id,registerFlag]);


    const registerHandler = async() => {
        try{
            const data = {
                comp_asin: registerAsin
            }
            console.log(data);
            await axios.post(`http://localhost:5000/competitorregister/${id}`, data)
            .then(function (response) {
                console.log(response);
                toast.success("Competitor Added");
                setRegisterFlag(!registerFlag);
                handleOk();
              })
              .catch(function (error) {
                console.log(error);
                toast.error(error);
              });
        } catch(err){
            toast.error(err);
        }
    }

    //Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

  return (
    <div>
        <Row>
            <Col>
        <h1>Competitors</h1>
            </Col>
            <Col>
                <div>
                    <Button type="primary" onClick={()=>setRegisterFlag(!registerFlag)}>
                        Refresh
                    </Button>
                </div>
            </Col>
            <Col className='col text-end'>
                <div>
                    <Button type="primary" onClick={showModal}>
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
                       <th class="col-sm-2">ASIN</th>
                       <th class="col-sm-6">NAME</th>
                       <th class="col-sm-2">PRICE</th>
                   </tr>
               </thead>
               <tbody>
                   {
                        competitorData && competitorData.map((item, index) => {
                            return (<> {(!item.delete_flag)?(
                                <tr key={index}> 
                                    <td>{item.comp_asin}</td>                               
                                    <td>{item.comp_name}</td>
                                    <td>{item.comp_price}</td>
                                </tr>
                            ):""}</>);
                          })
                   }
               </tbody>
           </table>
           </> 
        )}

            <Modal title="Add Competitor Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <form className="row g-3" onSubmit={(e)=>{e.preventDefault(); registerHandler();}}>
                <div className="col-md-6">
                    <label htmlFor="asin#" className="form-label">ASIN#</label>
                    <input type="text" className="form-control" onChange={(e)=>setRegisterAsin(e.target.value)} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
            </Modal>
    </div>
  )
}

export default CompetitorListScreen;
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Form from 'react-bootstrap/Form';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true};
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false};
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload};
    default:
      return state
  }
};

const EditProducts = () => {

  const params = useParams();
  const {id} = params;
  const navigate = useNavigate();

  const [{ loading, error, product }, dispatch] = useReducer( reducer, {
      loading: true,
      error: '',
    });    

  const [HSN_Code, setHSN_Code] = useState("");
  const [SKU, setSKU] = useState("");
  const [Product_Name, setProduct_Name] = useState("");
  const [MRP, setMRP] = useState("");
  const [EAN_CODE, setEAN_CODE] = useState("");
  const [Brand_Name, setBrand_Name] = useState("");
  const [GST, setGST] = useState("");

  useEffect(() => {
    const fetchData = async() => {
      try{
          const {data} = await axios.get(`http://localhost:5000/product/${id}`);
          setHSN_Code(data.HSN_Code);
          setSKU(data.SKU);
          setProduct_Name(data.Product_Name);
          setMRP(data.MRP);
          setEAN_CODE(data.EAN_CODE);
          setBrand_Name(data.Brand_Name);
          setGST(data.GST);
          dispatch({type: 'FETCH_SUCCESS', payload: data});
      }catch(err){

      }
    }
    fetchData();
    },[id])

  const submitProduct = (e) => {
    e.preventDefault();

    const data = {
      HSN_Code: HSN_Code,
      MRP: MRP,
      SKU: SKU,
      Product_Name: Product_Name,      
      EAN_CODE: EAN_CODE,      
      Brand_Name: Brand_Name,      
      GST: GST      
    }

    axios.post(`http://localhost:5000/productedit/${id}`,data)
    .then(function (response) {
      console.log(response);
      navigate('/');
      toast.success("Product Updated");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const { TabPane } = Tabs;

  return (
    <div className="container">
        {
        loading ? <div>Loading...</div>
        : 
        error ? <div>{error}</div>
        : (
    <Form onSubmit={submitProduct}>
      <div className='card p-5 m-3 bg-light'>
       <Tabs defaultActiveKey="1">
        <TabPane tab="Product Specifications" key="1">

              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>
                  SKU
                </Form.Label>
                <Form.Control
                  defaultValue={product.SKU}
                  onChange={(e)=>setSKU(e.target.value)}
                />
              </Form.Group>      
              <div className="form-floating">
                EAN CODE
              <input type="text"
                defaultValue={product.EAN_CODE}
                className="form-control"
                onChange={(e)=>setEAN_CODE(e.target.value)}
              />
              </div>
              <div className="form-floating">
                Brand Name
              <input type="text"
                defaultValue={product.Brand_Name}
                className="form-control"
                onChange={(e)=>setBrand_Name(e.target.value)}
              />
              </div>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>
                  Product Name
                </Form.Label>
                <Form.Control
                  defaultValue={product.Product_Name}
                  onChange={(e)=>setProduct_Name(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>
                  HSN Code
                </Form.Label>
                <Form.Control
                  defaultValue={product.HSN_Code}
                  onChange={(e)=>setHSN_Code(e.target.value)}
                />
              </Form.Group>
              <div className="form-floating">
                GST
              <input type="text"
                defaultValue={product.GST}
                className="form-control"
                onChange={(e)=>setGST(e.target.value)}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Description" key="2">
              <div className="form-floating">
                Description
              <input type="text"
                defaultValue={product.Description}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Bullet Point 1
              <input type="text"
                defaultValue={product.Bullet1}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Bullet Point 2
              <input type="text"
                defaultValue={product.Bullet2}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Bullet Point 3
              <input type="text"
                defaultValue={product.Bullet3}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Bullet Point 4
              <input type="text"
                defaultValue={product.Bullet4}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Bullet Point 5
              <input type="text"
                defaultValue={product.Bullet5}
                className="form-control"
              />
              </div>
        </TabPane>
        <TabPane tab="Product Measurements" key="3">
              <div className="form-floating">
                Item Weight
              <input type="text"
                defaultValue={product.Item_Weight}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Item Length
              <input type="text"
                defaultValue={product.Item_Length}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Item Width
              <input type="text"
                defaultValue={product.Item_Width}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Item Height
              <input type="text"
                defaultValue={product.Item_Height}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Item Unit Measure
              <input type="text"
                defaultValue={product.Item_Unit_Measure}
                className="form-control"
              />
              </div>
        </TabPane>
        <TabPane tab="Product Specifications 2" key="4">
              <div className="form-floating">
                Country of Origin
              <input type="text"
                defaultValue={product.Country}
                className="form-control"
              />
              </div>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>
                  MRP
                </Form.Label>
                <Form.Control
                  defaultValue={product.MRP}
                  onChange={(e)=>setMRP(e.target.value)}
                />
              </Form.Group>
              <div className="form-floating">
                Manufacturer
              <input type="text"
                defaultValue={product.Manufacturer}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Ingredients
              <input type="text"
                defaultValue={product.Ingredients}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Category
              <input type="text"
                defaultValue={product.Category}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Keywords
              <input type="text"
                defaultValue={product.Keywords}
                className="form-control"
              />
              </div>
        </TabPane>
        <TabPane tab="Images" key="5">
              <div className="form-floating">
                Main Image
              <input type="text"
                defaultValue={product.Main_Image}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 1
              <input type="text"
                defaultValue={product.Image1}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 2
              <input type="text"
                defaultValue={product.Image2}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 3
              <input type="text"
                defaultValue={product.Image3}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 4
              <input type="text"
                defaultValue={product.Image4}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 5
              <input type="text"
                defaultValue={product.Image5}
                className="form-control"
              />
              </div>
              <div className="form-floating">
                Other Image 6
              <input type="text"
                defaultValue={product.Image6}
                className="form-control"
              />
              </div>
        </TabPane>
      </Tabs>
      </div>
      <div className='m-5'>
        <button className="btn btn-primary" type="submit">Update</button>
      </div>
      </Form>
      )}
    </div>
  );
}

export default EditProducts;
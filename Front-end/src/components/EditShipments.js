import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify';


const EditShipments = () => {

  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [No_of_products, setNo_of_products] = useState(0);

  function onProductChange(e,i,j) {
    const inputData = [...productData];
    if(j===0){
        inputData[i][0] = e.target.value;
    }else if(j===1){
        inputData[i][1] = e.target.value;
    }else if(j===2){
        inputData[i][2] = e.target.value;
    }
    setProductData(inputData);
  }

  const handleAddDocs = (e) => {
    e.preventDefault();
    const abc = [...productData,[]];
    setProductData(abc);
    setNo_of_products(No_of_products + 1);
  };

  const handleDeleteDocs = (i) => {
    const deleteVal = [...productData];
    deleteVal.splice(i,1);
    setProductData(deleteVal);
  };

  const submitProduct = (data) => {
    var formData = new FormData();
    formData.append('Shipment_ID', data.Shipment_ID);
    formData.append('Shipment_Date', data.Shipment_Date);
    formData.append('Warehouse', data.Warehouse);
    formData.append('Shipped_Via', data.Shipped_Via);
    formData.append('No_of_products', No_of_products);
    for(let i=0;i<No_of_products;i++){
      formData.append(`SKU${i}`, productData[i][0]);
      formData.append(`Product_Name${i}`, productData[i][1]);
      formData.append(`Quantity${i}`, productData[i][2]);
    }
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    axios.post('http://localhost:5000/shipmentregister',formData)
    .then(function (response) {
      console.log(response);
      navigate('/shipment');
      toast.success("Shipment Added");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  //useForm
   const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="container">
    <form className='form' onSubmit={handleSubmit(submitProduct)}>
      <div className='card p-5 m-3 bg-light'>
              <h1 className="h3 mb-3 fw-normal">Please add shipment</h1>

              <div className="form-floating">
                Shipment ID
              <input type="text" placeholder="SKU"
                {...register("Shipment_ID",{required: true})}
                className={`form-control ${
                  errors.Shipment_ID ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
              Shipment Date
              <input type="text" placeholder="EAN CODE"
                {...register("Shipment_Date")}
                className={`form-control ${
                  errors.Shipment_Date ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
              Warehouse
              <input type="text" placeholder="Brand Name"
                {...register("Warehouse")}
                className={`form-control ${
                  errors.Warehouse ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
              Shipped Via
              <input type="text" placeholder="Product Name"
                {...register("Shipped_Via")}
                className={`form-control ${
                  errors.Shipped_Via ? "error-input" : ""
                }`}
              />
              </div>
              <h6>Add Products</h6>
          {
            productData && productData.map((data,i)=>{
              return (
              <div className='d-flex'>
                SKU
              <input type="text" placeholder="SKU"
                onChange={e=>onProductChange(e,i,0)}
              />  
              Product Name
              <input type="text" placeholder="Name"
                onChange={e=>onProductChange(e,i,1)}
              />
              Quantity
              <input type="text" placeholder="Quantity"
                onChange={e=>onProductChange(e,i,2)}
              />
              <button onClick={()=>handleDeleteDocs(i)}>x</button>
              </div>
              );
            })
          }
          <button onClick={handleAddDocs}><i class="fa-solid fa-circle-plus"></i></button>
      </div>
      <div className='m-5'>
        <button className="btn btn-primary" type="submit">Add Product</button>
      </div>
      </form>
    </div>
  );
}

export default EditShipments;
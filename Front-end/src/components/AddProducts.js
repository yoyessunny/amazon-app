import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const AddProduct = () => {

  const navigate = useNavigate();

  const submitProduct = (data) => {
    console.log(data);
    axios.post('http://localhost:5000/productregister',data)
    .then(function (response) {
      console.log(response);
      navigate('/productlist');
      toast.success("Product Added");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const { TabPane } = Tabs;

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
       <Tabs defaultActiveKey="1">
        <TabPane tab="Product Specifications" key="1">
              <h1 className="h3 mb-3 fw-normal">Please add product</h1>

              <div className="form-floating">
                SKU
              <input type="text" placeholder="SKU"
                {...register("SKU", {required: true})}
                className={`form-control ${
                  errors.SKU ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                EAN CODE
              <input type="text" placeholder="EAN CODE"
                {...register("EAN_CODE", {required: true})}
                className={`form-control ${
                  errors.EAN_CODE ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Brand Name
              <input type="text" placeholder="Brand Name"
                {...register("Brand_Name", {required: true})}
                className={`form-control ${
                  errors.Brand_Name ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Product Name
              <input type="text" placeholder="Product Name"
                {...register("Product_Name", {required: true})}
                className={`form-control ${
                  errors.Product_Name ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                HSN Code
              <input type="text" placeholder="HSN Code"
                {...register("HSN_Code", {required: true})}
                className={`form-control ${
                  errors.HSN_Code ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                GST
              <input type="text" placeholder="GST"
                {...register("GST", {required: true})}
                className={`form-control ${
                  errors.GST ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Description" key="2">
              <div className="form-floating">
                Description
              <input type="text" placeholder="Description"
                {...register("Description")}
                className={`form-control ${
                  errors.Description ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 1
              <input type="text" placeholder="Product Reviews"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 2
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 3
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 4
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 5
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Measurements" key="3">
              <div className="form-floating">
                Item Weight
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Length
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Width
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Height
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Unit Measure
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Specifications 2" key="4">
              <div className="form-floating">
                Country of Origin
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                MRP
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Manufacturer
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Ingredients
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Category
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Keywords
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Images" key="5">
              <div className="form-floating">
                Main Image
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 1
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 2
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 3
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 4
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 5
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 6
              <input type="text" placeholder="Product Description"
                {...register("fullName", {required: true, maxLength: 20})}
                className={`form-control ${
                  errors.fullName ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
      </Tabs>
      </div>
      <div className='m-5'>
        <button className="btn btn-primary" type="submit">Add Product</button>
      </div>
      </form>
    </div>
  );
}

export default AddProduct;
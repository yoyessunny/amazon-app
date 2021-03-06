import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {toast} from 'react-toastify';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const AddProduct = () => {

  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [No_of_files, setNo_of_files] = useState(0);

  function onFileChange(e,i) {
    const inputData = [...docs];
    inputData[i] = [...e.target.files];
    setUploadedFile(inputData);
    setDocs(inputData);
  }

  const handleAddDocs = () => {
    const abc = [...docs,[]];
    setDocs(abc);
    setNo_of_files(No_of_files + 1);
  };

  const handleDeleteDocs = (i) => {
    const deleteVal = [...docs];
    deleteVal.splice(i,1);
    setDocs(deleteVal);
    setUploadedFile(deleteVal);
  };

  const submitProduct = (data) => {
    var formData = new FormData();
    formData.append('SKU', data.SKU);
    formData.append('EAN_CODE', data.EAN_CODE);
    formData.append('Brand_Name', data.Brand_Name);
    formData.append('Product_Name', data.Product_Name);
    formData.append('HSN_Code', data.HSN_Code);
    formData.append('GST', data.GST);
    formData.append('MRP', data.MRP);
    formData.append('Document_Name', data.Document_Name);
    formData.append('No_of_files', No_of_files);
    docs && docs.map((data,i)=>{
      return (
      formData.append(`file${i}`, uploadedFile[i][0])
      )
    })
    // for (var pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }
    axios.post('http://localhost:5000/productregister',formData)
    .then(function (response) {
      if(response.data === "Product Exists"){
        toast.error("Product Already Exists");
      }else{
      console.log(response);
      navigate('/product');
      toast.success("Product Added");
      }
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
              <select
                className="m-3"
                {...register('GST')}>
                <option value="">Select...</option>
                <option value="0">GST_0</option>
                <option value="3">GST_3</option>
                <option value="5">GST_5</option>
                <option value="12">GST_12</option>
                <option value="18">GST_18</option>
                <option value="28">GST_28</option>
                <option value="APPAREL">GST_APPAREL</option>
              </select>
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
              <input type="text" placeholder=""
                {...register("Bullet1")}
                className={`form-control ${
                  errors.Bullet1 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 2
              <input type="text" placeholder=""
                {...register("Bullet2")}
                className={`form-control ${
                  errors.Bullet2 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 3
              <input type="text" placeholder=""
                {...register("Bullet3")}
                className={`form-control ${
                  errors.Bullet3 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 4
              <input type="text" placeholder=""
                {...register("Bullet4")}
                className={`form-control ${
                  errors.Bullet4 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Bullet Point 5
              <input type="text" placeholder=""
                {...register("Bullet5")}
                className={`form-control ${
                  errors.Bullet5 ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Measurements" key="3">
              <div className="form-floating">
                Item Weight
              <input type="text" placeholder=""
                {...register("Item_Weight")}
                className={`form-control ${
                  errors.Item_Weight ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Length
              <input type="text" placeholder=""
                {...register("Item_Length")}
                className={`form-control ${
                  errors.Item_Length ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Width
              <input type="text" placeholder=""
                {...register("Item_Width")}
                className={`form-control ${
                  errors.Item_Width ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Height
              <input type="text" placeholder=""
                {...register("Item_Height")}
                className={`form-control ${
                  errors.Item_Height ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Item Unit Measure
              <input type="text" placeholder=""
                {...register("Item_Unit_Measure")}
                className={`form-control ${
                  errors.Item_Unit_Measure ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Product Specifications 2" key="4">
              <div className="form-floating">
                Country of Origin
              <input type="text" placeholder=""
                {...register("Country")}
                className={`form-control ${
                  errors.Country ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                MRP
              <input type="text" placeholder="MRP"
                {...register("MRP", {required: true})}
                className={`form-control ${
                  errors.MRP ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Manufacturer
              <input type="text" placeholder=""
                {...register("Manufacturer")}
                className={`form-control ${
                  errors.Manufacturer ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Ingredients
              <input type="text" placeholder=""
                {...register("Ingredients")}
                className={`form-control ${
                  errors.Ingredients ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Category
              <input type="text" placeholder=""
                {...register("Category")}
                className={`form-control ${
                  errors.Category ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Keywords
              <input type="text" placeholder=""
                {...register("Keywords")}
                className={`form-control ${
                  errors.Keywords ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Images" key="5">
              <div className="form-floating">
                Main Image
              <input type="text" placeholder=""
                {...register("Main_Image")}
                className={`form-control ${
                  errors.Main_Image ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 1
              <input type="text" placeholder=""
                {...register("Image1")}
                className={`form-control ${
                  errors.Image1 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 2
              <input type="text" placeholder=""
                {...register("Image2")}
                className={`form-control ${
                  errors.Image2 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 3
              <input type="text" placeholder=""
                {...register("Image3")}
                className={`form-control ${
                  errors.Image3 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 4
              <input type="text" placeholder=""
                {...register("Image4")}
                className={`form-control ${
                  errors.Image4 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 5
              <input type="text" placeholder=""
                {...register("Image5")}
                className={`form-control ${
                  errors.Image5 ? "error-input" : ""
                }`}
              />
              </div>
              <div className="form-floating">
                Other Image 6
              <input type="text" placeholder=""
                {...register("Image6")}
                className={`form-control ${
                  errors.Image6 ? "error-input" : ""
                }`}
              />
              </div>
        </TabPane>
        <TabPane tab="Documents" key="6">
          {
            docs && docs.map((data,i)=>{
              return (
                <div className="form-floating">
                Document Name
              <input type="text" placeholder=""
                {...register("Document_Name")}
                className={`form-control ${
                  errors.Image6 ? "error-input" : ""
                }`}
              />  
              <input type="file" onChange={e=>onFileChange(e,i)}
              />
              <button onClick={()=>handleDeleteDocs(i)}>x</button>
              </div>
              );
            })
          }
          <button onClick={handleAddDocs}><i class="fa-solid fa-circle-plus"></i></button>
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
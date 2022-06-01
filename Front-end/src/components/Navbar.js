import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {

  var loginname = useSelector((state) => state.loginName);
  if(loginname === ""){
    loginname = Cookies.get("loginname");
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const logout = () => {
    dispatch({
      type:'delete'
    });
    Cookies.remove("loginname");
  }

  let menu;

  if(loginname===""){
    menu = (
      <Link to="/login" type="button" className="btn btn-outline-dark me-2">Login</Link>
    );
  }else{
    menu = (
      <Link to="/login" type="button" className="btn btn-outline-dark me-2" onClick={logout}>Logout</Link>
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${searchTerm}`);
  }

  return (
    <div style={{marginLeft: "120px",position:"sticky",top:"0px",backgroundColor:'white',zIndex:"10"}}>
      <header className="p-3 bg-light text-black">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
            <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              
            </div>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" onSubmit={submitHandler}>
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" 
               onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <div className="text-end">
              {menu}
              <Link to="/register" type="button" className="btn btn-warning">Register</Link>
              {loginname ? 'Welcome ' + loginname : 'Guest'}
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar;
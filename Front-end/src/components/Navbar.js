import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {

  const loginname = useSelector((state) => state.loginName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const logout = () => {
    dispatch({
      type:'delete'
    });
  }

  let menu;

  if(loginname===""){
    menu = (
      <Link to="/login" type="button" className="btn btn-outline-light me-2">Login</Link>
    );
  }else{
    menu = (
      <Link to="/login" type="button" className="btn btn-outline-light me-2" onClick={logout}>Logout</Link>
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${searchTerm}`);
  }

  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img src='logo192.png' alt='' width='50px' />
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 text-white">ProductList</Link></li>
              <li><Link to="/trashproductlist" className="nav-link px-2 text-white">Trash</Link></li>
            </ul>

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
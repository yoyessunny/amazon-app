import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidenav" style={{top:"0px",zIndex:"10000"}}>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          <img src='logo192.png' alt='' width='50px' />
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/product" className="nav-link">
          Products
        </Link>
      </li>
      <li>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </li>
      <li>
      <div className="accordion" id="accordionExample">
          <Link to="/payments" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Payments
          </Link>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <Link to="/payments" className="nav-link">
              Import
            </Link>          
            <Link to="/payments/order" className="nav-link">
              Order
            </Link>
            <Link to="/payments/adjustment" className="nav-link">
              Adjustment
            </Link>
            <Link to="/payments/fbainventoryfee" className="nav-link">
              FBA Inventory Fee
            </Link>
            <Link to="/payments/refund" className="nav-link">
              Refund
            </Link>
            <Link to="/payments/servicefee" className="nav-link">
              Service Fee
            </Link>
            <Link to="/payments/taxwithheld" className="nav-link">
              Tax Withheld
            </Link>
            <Link to="/payments/transfer" className="nav-link">
              Transfer
            </Link>
            <Link to="/payments/other" className="nav-link">
              Other
            </Link>
          </div>
        </div>
      </div>
      </li>
      <li>
      <div className="accordion" id="accordionExample">
          <Link to="/inventory" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          Inventory
          </Link>
        <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <Link to="/inventory" className="nav-link">
              All
            </Link>
            <Link to="/payments" className="nav-link">
              FBA
            </Link>          
            <Link to="/payments/order" className="nav-link">
              MFN
            </Link>
          </div>
        </div>
      </div>
      </li>
      <li>
        <Link to="/shipment" className="nav-link">
          Shipment
        </Link>
      </li>
    </ul>
    </div>
    </div>
  )
}

export default Sidebar;
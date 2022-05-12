import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">&copy; 2021 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><i class="fa-brands fa-twitter"></i></li>
                <li className="ms-3"><i class="fa-brands fa-facebook"></i></li>
                <li className="ms-3"><i class="fa-brands fa-instagram"></i></li>
                </ul>
            </footer>
        </div>
    </div>
  )
}

export default Footer
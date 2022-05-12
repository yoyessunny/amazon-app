import React,{useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();

    var data = {
      "email": email,
      "password": password,
      "name": name,
    };
    axios.post('http://localhost:5000/register',data)
    .then(function (response) {
      console.log(response);
      toast.success("Registered");
    })
    .catch(function (error) {
      console.log(error);
    });
};
   
  return (
    <div className="text-center">   
    <main className="form-signin">          
      <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <div className="form-floating">
          <input type="email" className="form-control" placeholder="name@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          </div>
          <div className="form-floating">
          <input type="password" className="form-control" placeholder="Password" 
            onChange={e => setPassword(e.target.value)}
          />
          </div>
          <div className="form-floating">
          <input type="text" className="form-control" placeholder="Name" 
            onChange={e => setName(e.target.value)}
          />
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
      </form>
    </main>
    </div>
  );
}

export default Register;
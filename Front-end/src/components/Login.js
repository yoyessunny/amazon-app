import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
    var data = {
      "email": email
    }; 
    var config = {
      method: 'post',
      url: 'http://localhost:5000/user',
      headers: {
        "access-token": localStorage.getItem("token")
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(response);
      const loginname = response.data;
      Cookies.set("loginname",loginname,{
        expires: 30
      })
      dispatch({
        type:'add',
        item: loginname
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  },[dispatch, loginResponse, email]);

  const submit = (e) => {
      e.preventDefault();

      var data = {
        "email": email,
        "password": password
      };
      axios.post('http://localhost:5000/login',data)
      .then(function (response) {
        console.log(response);
        if(!response.data.token){
        setLoginResponse(false);
        } else {
          setLoginResponse(true);
          localStorage.setItem("token", response.data.token)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="text-center">   
      <main className="form-signin">          
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className='forgot-password text-right'>
            <Link to="/forgot">Forgot password?</Link>  
            </p>
        </form>
      </main>
    </div>
  )
}

export default Login;
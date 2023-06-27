import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password).then(() => {
      if (store.token && store.token !== "" && store.token != undefined) navigate('/private')
    });
  }

  return (
    <div className="container">
      <h1 className='text-center p-3'>Login</h1>
      <div className='row d-flex justify-content-center'>
        <div className='col-4'>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword3" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
          </div>
          <div className='row'>
            <div className='col-9 mx-auto'>
              <button type="submit" className="btn btn-primary me-2" onClick={handleClick}>Login</button>
              <button className='btn btn-success'>No login? Register here</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};



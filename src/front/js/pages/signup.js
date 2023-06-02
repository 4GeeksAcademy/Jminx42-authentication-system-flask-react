import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    const signup = await actions.signup(email, password);
    if (signup) {
      console.log(signup);
      navigate('/login');
    }

  }

  return (
    <div className="container">
      <h1 className='text-center p-3'>Sign up</h1>
      <div className='row d-flex justify-content-center'>
        <div className='col-4'>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" >Email</label>
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
          <div className='row ms-auto'>
            <button type="submit" className="btn btn-success" onClick={handleClick}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
};



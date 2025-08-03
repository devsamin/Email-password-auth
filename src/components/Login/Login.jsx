import React from "react";
import auth from "../../__auth_firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const hendelsubmit = (e) =>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          console.log(res.user)
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={hendelsubmit}>
            <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />
                <label  className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;

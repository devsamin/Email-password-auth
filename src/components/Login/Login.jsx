import React, { useState } from "react";
import auth from "../../__auth_firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [errMessage, seterrMessage] = useState("");
  const [successM, setSuccessM] = useState("");

  const hendelsubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    seterrMessage("");
    setSuccessM("")

    if(password.length < 6){
      seterrMessage('Password should be at least more then 6 character')
      return
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
      seterrMessage('Password must be at least one digit or one lower char and capital char one special char')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccessM('Sign Up SuccessFully')
      })
      .catch((err) => {
        console.log(err);
        seterrMessage(err.message);
      });
  };
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
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />
                  <label className="label">Password</label>
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
                  {errMessage && <p className="text-red-600">{errMessage}</p>}
                  {
                    successM && <p className="text-green-600">{successM}</p>
                  }
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

import React, { useState } from "react";
import auth from "../../__auth_firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  const [errMessage, seterrMessage] = useState("");
  const [successM, setSuccessM] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const hendelsubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkBox = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
console.log(name, photo)
    console.log(email, password, checkBox);
    seterrMessage("");
    setSuccessM("");

    if (!checkBox) {
      seterrMessage("Please allow ta checkbox");
      return;
    }

    if (password.length < 6) {
      seterrMessage("Password should be at least more then 6 character");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      seterrMessage(
        "Password must be at least one digit or one lower char and capital char one special char"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccessM("Sign Up SuccessFully");

        // send verification email
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          console.log(" Verification email send....")
        });
        // update user profile
          const profile = {
            displayName : name,
            photoURL : photo,
          }

          updateProfile(auth.currentUser, profile)
          .then(()=>{
            console.log("Profile Updated Successfully...")
          })
          .catch(err=>{
            console.log("Invalid name and photo url", err)
          })
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
              <div className="card-body ">
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="name"
                  />
                  <label className="label">Photo Url</label>
                  <input
                    type="text"
                    name="photo"
                    className="input"
                    placeholder="photo"
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />

                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showpassword ? "text" : "password"}
                      className="input pr-24"
                      placeholder="Password"
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowpassword(!showpassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <input type="checkbox" name="terms" className="checkbox" />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Login</button>
                  {errMessage && <p className="text-red-600">{errMessage}</p>}
                  {successM && <p className="text-green-600">{successM}</p>}
                  <p>
                    Already heave an accout <Link to={"/login2"}>Login</Link>
                  </p>
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

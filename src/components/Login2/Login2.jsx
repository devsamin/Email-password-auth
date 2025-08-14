import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../__auth_firebase";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Login2 = () => {
  const [success, setsuccess] = useState(false);
  const [errm, seterrm] = useState("");
  const refemail = useRef();

  const handelforgetpassword = () => {
    console.log("get email", refemail.current.value);
    const email = refemail.current.value;
    if(!email){
      console.log("Please write valid email")
    }
    else{
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        console.log("Check the mail")
      })
    }
  };

  const hendelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    seterrm("");

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user.emailVerified) {
          setsuccess(true);
        } else {
          seterrm("Plase verify your email");
        }
      })
      .catch((err) => {
        console.log(err);
        setsuccess(false);
        seterrm("User is Invalid");
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={hendelLogin} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                  ref={refemail}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
            

                <a onClick={handelforgetpassword}  className="link link-hover">
                  Forgot password?
                </a>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              {success && (
                <p className="text-green-600">User login successful</p>
              )}
              {errm && <p className="text-red-600">{errm}</p>}
              <p>
                Are you a new user please click{" "}
                <Link to={"/login"}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;

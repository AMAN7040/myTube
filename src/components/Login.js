// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [error] = useState(null);
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser(result._tokenResponse));
      navigate("/"); // Redirect to home page (Browse) after sign-in
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#141414" }}
      className="text-white flex justify-center items-center w-full h-screen"
    >
      <div className="bg-white text-black w-3/4 md:w-2/4 2xl:w-1/4 h-[50%] rounded-lg border-4 border-red-500">
        {error && <p className="text-red-500 text-center">{error.message}</p>}
        <h1 className="text-center font-bold text-xl p-5 m-5">Login Page</h1>
        <p className="text-center mt-1 mb-2">
          Sign in with your Google account to access the application.
        </p>
        <button
          className="bg-blue-400 text-center p-4 mx-[30%] my-[30%]"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;

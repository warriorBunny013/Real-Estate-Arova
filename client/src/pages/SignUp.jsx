import { set } from "mongoose";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import OAuth from "../components/OAuth";

const SignUp = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

  };

  return (
    <div className="p-3 max-w-lg mx-auto font-serif mt-10 bg-blue-200">
      <h1 className="text-3xl text-center font-semibold mt-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}        
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}        
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* <OAuth  /> */}
      </form>

      <div className="flex font-serif justify-center gap-2 ">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 m">{error}</p>}
    </div>
  );
};

export default SignUp;

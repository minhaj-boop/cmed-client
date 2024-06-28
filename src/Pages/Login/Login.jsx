import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      // const url ="https://bb212102-2fab-4fae-9227-3b2b24cf1275.mock.pstmn.io/auth/api/login/";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      const user = localStorage.getItem("token");
      if (user) {
        window.location = "/chart";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-4">
            <p className="text-gray-600 uppercase">Log In</p>
            {/* <h2 className="text-xl font-bold">Join our community</h2> */}
          </div>
          <div className="pb-2">
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>
          <div className="pb-2">
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="w-[370px] p-[15px] mx-[5px] text-[14px] bg-[#f34646] text-white rounded-[5px] text-center">
              {error}
            </div>
          )}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-[50%] py-4 bg-pink-400 hover:bg-pink-500 text-sm font-bold text-gray-50 transition duration-200 rounded-[5px]"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

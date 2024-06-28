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
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      const user = localStorage.getItem("token");
      if (user) {
        window.location = "/chart";
      }
      // navigate("/upload");
      // console.log(res.message, data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
          <div className="flex items-center justify-between">
            {/* <div className="flex flex-row items-center">
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                for="comments"
                className="ml-2 text-sm font-normal text-gray-600"
              >
                Remember me
              </label>
            </div> */}
            {/* <div>
                <a className="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

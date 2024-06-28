import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-100 min-h-[100vh] bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-100 h-full flex rounded-[10px] ">
        <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-tr-[10px] rounded-br-[10px]">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="text-[40px] mt-0">Sign up</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="outline-none border-none w-[370px] p-[15px] rounded-[10px] bg-orange-100 mx-[5px] mb-[5px] text-[14px]"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="outline-none border-none w-[370px] p-[15px] rounded-[10px] bg-orange-100 mx-[5px] mb-[5px] text-[14px]"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="outline-none border-none w-[370px] p-[15px] rounded-[10px] bg-orange-100 mx-[5px] mb-[5px] text-[14px]"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="outline-none border-none w-[370px] p-[15px] rounded-[10px] bg-orange-100 mx-[5px] mb-[5px] text-[14px]"
            />
            {error && (
              <div className="w-[370px] p-[15px] mx-[5px] text-[14px] bg-[#f34646] text-white rounded-[5px] text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-[50%] py-4 bg-pink-400 hover:bg-pink-500 text-sm font-bold text-gray-50 transition duration-200 rounded-[5px]"
            >
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

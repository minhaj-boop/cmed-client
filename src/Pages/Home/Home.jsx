import React from "react";

const Home = () => {
  const handleOnClick = () => {
    window.location = "/login";
  };

  const handleGotToCharts = () => {
    window.location = "/chart";
  };
  const user = localStorage.getItem("token");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {!user && (
        <button
          onClick={handleOnClick}
          className="px-[50px] py-[30px] bg-pink-400 text-white text-[20px] uppercase font-bold"
        >
          Login in
        </button>
      )}
      {user && (
        <button
          onClick={handleGotToCharts}
          className="px-[50px] py-[30px] bg-pink-400 text-white text-[20px] uppercase font-bold"
        >
          Create Charts
        </button>
      )}
    </div>
  );
};

export default Home;

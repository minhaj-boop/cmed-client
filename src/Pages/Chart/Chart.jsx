import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Chart = () => {
  //states
  const [textInput, setTextInput] = useState("");
  const [dropdownInput, setDropdownInput] = useState("Line Chart");
  const [charts, setCharts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    window.location = "/";
  };

  //handle change in text input
  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  //handle change in dropdown
  const handleDropdownInputChange = (e) => {
    setDropdownInput(e.target.value);
  };

  //handle submit on form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //alert is text input is empty
    if (!textInput) {
      alert("Please Enter a chart name");
      return;
    }
    // if text input is not empty then execute
    if (textInput && dropdownInput) {
      const newChart = {
        name: textInput,
        type: dropdownInput,
      };
      setCharts([...charts, newChart]);
      // setTextInput("");
      setDropdownInput(textInput);
    }
  };

  // on delete button click load the modal
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  // handle chart deletion
  const handleDeleteChart = (index) => {
    const updatedCharts = charts.filter((_, i) => i !== index);
    setCharts(updatedCharts);
    // setShowModal(false);
  };

  // delete all charts at once
  const handleDeleteAllCharts = () => {
    setCharts([]);
    // setShowModal(false);
  };

  // chart options
  const getChartOptions = (chart) => {
    const commonOptions = {
      title: {
        text: chart.name,
      },
      series: [
        {
          data: [1, 2, 3, 4],
        },
      ],
    };

    switch (chart.type) {
      case "Line Chart":
        return {
          ...commonOptions,
          chart: {
            type: "line",
          },
        };
      case "Bar Chart":
        return {
          ...commonOptions,
          chart: {
            type: "column",
          },
        };
      case "Area Chart":
        return {
          ...commonOptions,
          chart: {
            type: "area",
          },
        };
      default:
        return commonOptions;
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center px-[50px]">
        <div className="h-[150px] w-full px-[50px] flex justify-between items-center border-2 border-gray-200 my-8 rounded-[5px]">
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 items-center p-2 rounded-[5px]"
          >
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter chart name"
              className="px-[40px] border-[2px] border-red-300 rounded-[5px] py-[20px] focus:border-[2px] focus:border-red-400"
            />
            <select
              value={dropdownInput}
              onChange={handleDropdownInputChange}
              className="px-[40px] border-[2px] border-red-300 rounded-[5px] py-[20px] focus:border-[2px] focus:border-red-400"
            >
              <option className="text-[20px]" value="Line Chart">
                Line Chart
              </option>
              <option className="text-[20px]" value="Bar Chart">
                Bar Chart
              </option>
              <option className="text-[20px]" value="Area Chart">
                Area Chart
              </option>
            </select>
          </form>
          <div className="flex justify-between items-center gap-4">
            <button
              className="uppercase px-[30px] py-[15px] border-2 border-purple-400 rounded-[5px]"
              onClick={handleSubmit}
            >
              Create
            </button>

            <button
              className="uppercase px-[30px] py-[15px] border-2 border-purple-400 rounded-[5px]"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
            <button
              onClick={handleLogout}
              className="uppercase px-[30px] py-[15px] border-2 border-purple-400 rounded-[5px]"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full overflow-y-scroll h-full px-[50px] border-2 border-gray-200 rounded-[5px]">
          {charts.map((chart, index) => (
            <div className="border-[2px] border-gray-400 my-[10px]">
              <HighchartsReact
                key={index}
                highcharts={Highcharts}
                options={getChartOptions(chart)}
              />
            </div>
          ))}
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto max-w-3xl bg-slate-50 rounded-[5px] p-[10px] min-w-[450px] w-[600px] h-[550px] min-h-[400px] flex items-center justify-center flex-col">
              <h2 className="text-xl font-bold mb-4 uppercase">
                Delete Charts
              </h2>
              {charts.length !== 0 ? (
                <>
                  <ul className="mb-4">
                    {charts.map((chart, index) => (
                      <li key={index}>
                        <span className="uppercase px-[10px] py-[5px] border-2 border-purple-400 rounded-[5px] mb-4 mr-[10px] bg-green-500">
                          {" "}
                          {chart.name}
                        </span>
                        <button
                          className="uppercase px-[10px] py-[5px] border-2 border-purple-400 rounded-[5px] mb-4 ml-[10px] hover:bg-red-600"
                          onClick={() => handleDeleteChart(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="hover:bg-red-600 uppercase px-[30px] py-[15px] border-2 border-purple-400 rounded-[5px] mb-4"
                    onClick={handleDeleteAllCharts}
                  >
                    Delete All Charts
                  </button>{" "}
                </>
              ) : (
                <div>NO CHARTS CREATED!</div>
              )}
              <button
                className="hover:bg-gray-500 uppercase px-[30px] py-[15px] border-2 border-purple-400 rounded-[5px]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Chart;

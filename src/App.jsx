import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import addWeeks from "date-fns/addWeeks";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Data from "./holiday.json";
import { cloneDeep } from "lodash";

import "./App.css";

function App() {
  const [value, setValue] = useState([null, null]);
  const [country, setCountry] = useState("england-and-wales");
  const [data, setData] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setData(Data.Data[country]);
    handleClick(date);
  }, [country]);
  //   const fetchData = () =>{
  //       axios("http://gov.uk/bank-holidays.json")
  //       .then(res=>{
  //           console.log(res);
  //       })
  //   }
  function formatDate(val) {
    let split = val.toLocaleDateString("en-US").split("/");
    if (split[0].length < 2) split[0] = "0" + split[0];
    if (split[1].length < 2) split[1] = "0" + split[1];
    return split[2] + "-" + split[0] + "-" + split[1];
  }
  console.log(country);
  const handleClick = (val) => {
    setDate(val);
    if (val === "yesterday") {
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      let temp = formatDate(yesterday);
      console.log(Data.Data[country]?.events);
      let tempData = Data.Data[country]?.events.filter(
        (ele) => ele.date === temp
      );
      setData(tempData);
    } else if (val === "LW") {
      const todayObj = new Date();
      const todayDate = todayObj.getDate();

      // get first date of week
      const firstDayOfWeek = formatDate(
        new Date(todayObj.setDate(todayDate - 7))
      );

      // get last date of week
      const lastDayOfWeek = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      console.log(firstDayOfWeek, lastDayOfWeek);
      // if date is equal or within the first and last dates of the week
      // return date >= firstDayOfWeek && date <= lastDayOfWeek;
      Data.Data[country]?.events.forEach((element) => {
        console.log(
          element.date >= firstDayOfWeek && element.date <= lastDayOfWeek
        );
      });
      let tempData = cloneDeep(Data.Data[country]);

      tempData.events = Data.Data[country]?.events.filter(
        (element) =>
          element.date >= firstDayOfWeek && element.date <= lastDayOfWeek
      );
      console.log(tempData);
      setData(tempData);
    } else if (val === "LM") {
      const todayObj = new Date();
      const todayDate = todayObj.getDate();

      // get first date of month
      const firstDayOfMonth = formatDate(
        new Date(todayObj.setDate(todayDate - 30))
      );

      // get last date of week
      const lastDayOfMonth = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 1))
      );
      console.log(firstDayOfMonth, lastDayOfMonth);
      // if date is equal or within the first and last dates of the week
      // return date >= firstDayOfMonth && date <= lastDayOfMonth;
      Data.Data[country]?.events.forEach((element) => {
        console.log(
          element.date >= firstDayOfMonth && element.date <= lastDayOfMonth
        );
      });
      let tempData = cloneDeep(Data.Data[country]);

      tempData.events = Data.Data[country]?.events.filter(
        (element) =>
          element.date >= firstDayOfMonth && element.date <= lastDayOfMonth
      );
      console.log(tempData);
      setData(tempData);
    } else if (val === "custom") {
      // get first date of week
      const firstDayOfWeek = formatDate(value[0]);

      // get last date of week
      const lastDayOfWeek = formatDate(value[1]);
      console.log(firstDayOfWeek, lastDayOfWeek, "sd");
      // if date is equal or within the first and last dates of the week
      // return date >= firstDayOfWeek && date <= lastDayOfWeek;
      Data.Data[country]?.events.forEach((element) => {
        console.log(
          element.date >= firstDayOfWeek && element.date <= lastDayOfWeek
        );
      });
      let tempData = cloneDeep(Data.Data[country]);

      tempData.events = Data.Data[country]?.events.filter(
        (element) =>
          element.date >= firstDayOfWeek && element.date <= lastDayOfWeek
      );
      console.log(tempData, "dada");
      setData(tempData);
    }
  };
  return (
    <div className="wrapper">
      <nav>
        <p>Holiday Finder App</p>
      </nav>
      <div className="section">
        <div className="sidebar">
          <p>
            {" "}
            Filter By Date <FilterAltIcon />{" "}
          </p>

          <div
            className={`option ${date === "yesterday" ? "selected" : ""}`}
            onClick={() => handleClick("yesterday")}
          >
            Yesterday
          </div>
          <div
            className={`option ${date === "LW" ? "selected" : ""}`}
            onClick={() => handleClick("LW")}
          >
            Last Week
          </div>
          <div
            className={`option ${date === "LM" ? "selected" : ""}`}
            onClick={() => handleClick("LM")}
          >
            Last Month
          </div>
          <div className="option">
            Custom Date
            <div className="custom">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  disablePast
                  value={value}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 2191))
                  }
                  //   maxDate={getWeeksAfter(value[0], 4)}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <div className="customDate">
                      <TextField size="small" {...startProps} />
                      <br />
                      <TextField size="small" {...endProps} />
                    </div>
                  )}
                />
              </LocalizationProvider>
              <div className="apply" onClick={() => handleClick("custom")}>
                <p>Apply</p>
              </div>
            </div>
          </div>
        </div>
        <div className="eventsDisplay">
          <div className="countryList">
            <p
              className={`${country === "england-and-wales" ? "active" : ""}`}
              onClick={() => setCountry("england-and-wales")}
            >
              England And Wales
            </p>
            <p
              className={`${country === "scotland" ? "active" : ""}`}
              onClick={() => setCountry("scotland")}
            >
              Scotland
            </p>
            <p
              className={`${country === "northern-ireland" ? "active" : ""}`}
              onClick={() => setCountry("northern-ireland")}
            >
              Northern Ireland
            </p>
          </div>
          <div className="cards">
            {data?.events?.length > 0 ? (
              data?.events?.map((ele, idx) => <EventCard ele={ele} />)
            ) : (
              <p style={{ margin: "auto", width: "100%" }}>
                No available Holidays in {country.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

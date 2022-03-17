import "./App.css";
import { useState, useEffect } from "react";
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import SearchIcon from "@mui/icons-material/Search";
const App = () => {
  const [place, setplace] = useState("new york");
  const [placeInfo, setplaceInfo] = useState({});

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=7091be008b7642abb36221253221003&q=${place}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        // console.log(data)

        setplaceInfo({
          name: data.location.name,
          country: data.location.country,
          farenheit: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c,
          },
          condition: data.current.condition.text,
        })
      );
    setplace("");
  };

  console.log(placeInfo);

  return (
    <div className="container">
      <div
        className="app"
        style={
          placeInfo.condition?.toLowerCase() === "clear" ||
          placeInfo.condition?.toLowerCase() === "sunny"
            ? { backgroundImage: `url(${Clear})` }
            : placeInfo.condition?.includes("cloudy")
            ? { backgroundImage: `url(${Cloudy})` }
            : placeInfo.condition?.toLowerCase().includes("rainy")
            ? { backgroundImage: `url(${Rainy})` }
            : placeInfo.condition?.toLowerCase().includes("snow")
            ? { backgroundImage: `url(${Snow})` }
            : { backgroundImage: `url(${Overcast})` }
        }
      >
   
        <div className="content">
          <div className="info">
           
              <div className="details">
                <div className="temp">
                  <h1>{placeInfo.farenheit?.current} ° C</h1>
                </div>
                <div className="feel-likes">
                  <h1>{placeInfo.condition}</h1>
                  <h2>{placeInfo.farenheit?.high} ° C</h2>
                  <h2>{placeInfo.farenheit?.low} ° C</h2>
                </div>
              </div>
              <div className="search-input">
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setplace(e.target.value)}
                />
                <SearchIcon
                  onClick={handlefetch}
                  fontSize="large"
                  className="search-button"
                />
              </div>
           
          </div>
          <div className="country-name">
            <h2>
              {placeInfo.name},{placeInfo.country}
            </h2>
          </div>
        </div>
       
        {/* <div>
          <div className="search-input">
            <input
              type="text"
              value={place}
              onChange={(e) => setplace(e.target.value)}
            />
            <SearchIcon
              onClick={handlefetch}
              fontSize="large"
              className="search-button"
            />
          </div>
        </div>
        <div className="weather-container">
          <div className="top-part">
            <h1>{placeInfo.farenheit?.current} ° C</h1>
            <div className="condition-high-low">
              <h1>{placeInfo.condition}</h1>
              <h1>{placeInfo.farenheit?.high} ° C</h1>
              <h1>{placeInfo.farenheit?.low} ° C</h1>
            </div>
          </div>
          <h2>
            {placeInfo.name},{placeInfo.country}
          </h2>
        </div> */}
      </div>
    </div>
  );
};

export default App;

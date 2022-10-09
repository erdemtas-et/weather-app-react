import { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  //states
  const [search, setSearch] = useState("");
  const [cityKey, setCityKey] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    cityName: null,
    temperature: null,
    wind: null,
    text: null,
    country: null,
    icon: null,
  });

  //apikey
  const apiKey = "	7OhxFAxnPfs5yqv29MyqkKkmA0UROsUu";

  //get city input
  const submitSearch = (e) => {
    e.preventDefault();
    let inputValue = e.target.elements.city.value;
    if (inputValue === "") {
      toast.error("Please enter any city name");
    } else {
      setSearch(inputValue.toLowerCase().trim(" "));
      e.target.reset();
    }
  };

  //fetch location key
  useEffect(() => {
    if (search !== "") {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${search}`
      )
        .then((res) => {
          if (res.status < 400) {
            return res.json();
          } else {
            return;
          }
        })
        .then((data) => {
          console.log(data);
          if (data.length === 0) {
            toast.error("Please enter any valid city");
          } else {
            setCountry(data[0].Country.ID);
            setCity(data[0].EnglishName);
            setCityKey(data[0].Key);
          }
        });
    }
  }, [search]);

  //fetch city details
  useEffect(() => {
    if (cityKey !== "") {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityKey}?apikey=${apiKey}&metric=true&details=true`
      )
        .then((res) => {
          if (res.status > 399) {
            return;
          } else {
            setIsLoading(false);
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          setWeatherData(() => {
            return {
              cityName: city,
              temperature: data.DailyForecasts[0].Temperature.Maximum.Value,
              wind: data.DailyForecasts[0].Day.Wind.Speed.Value,
              text: data.DailyForecasts[0].Day.IconPhrase,
              country: country,
              icon: data.DailyForecasts[0].Day.Icon,
            };
          });
        });
    }
  }, [cityKey, city, country]);

  //useEffect

  return (
    <div className="home">
      <Search submitSearch={submitSearch}></Search>
      <ToastContainer
        toastStyle={{ backgroundColor: "rgba(0,0,0,0.3", color: "white" }}
      ></ToastContainer>
      {!isLoading && (
        <Card
          cityName={weatherData.cityName}
          wind={weatherData.wind}
          temperature={weatherData.temperature}
          text={weatherData.text}
          country={weatherData.country}
          iconData={weatherData.icon}
        ></Card>
      )}
    </div>
  );
}

export default Home;

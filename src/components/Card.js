import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDaySunny,
  WiDaySunnyOvercast,
} from "react-icons/wi";

function Card({ cityName, temperature, wind, text, country, iconData }) {
  function getIcon(icon) {
    let iconEl = <WiCloud className="icon"></WiCloud>;
    if (icon === 1) {
      iconEl = <WiDaySunny className="icon"></WiDaySunny>;
    } else if (icon >= 2 && icon <= 5) {
      iconEl = <WiDaySunnyOvercast className="icon"></WiDaySunnyOvercast>;
    } else if (icon >= 6 && icon <= 11) {
      iconEl = <WiDayCloudy className="icon"></WiDayCloudy>;
    } else if (icon >= 12 && icon <= 18) {
      iconEl = <WiDayRain className="icon"></WiDayRain>;
    } else if (icon >= 19 && icon <= 22) {
      iconEl = <WiDaySunnyOvercast className="icon"></WiDaySunnyOvercast>;
    } else if (icon >= 23 && icon <= 29) {
      iconEl = <WiCloudy className="icon"></WiCloudy>;
    } else {
      iconEl = <WiCloud className="icon"></WiCloud>;
    }

    return iconEl;
  }

  return (
    <div className="card-container">
      <div className="card-details">
        <div className="city-temp">
          <h3 className="city-h2">
            {cityName}, <span className="country-span">{country}</span>
          </h3>
          <h3 className="temperature-h3">{temperature} °C</h3>
        </div>
        <span>{text}</span>
        <h4 className="wind-h4">
          Wind Speed : {wind} <span className="wind-unit">km/h</span>
        </h4>
        <div className="icon-container">{getIcon(iconData)}</div>
      </div>
    </div>
  );
}

export default Card;

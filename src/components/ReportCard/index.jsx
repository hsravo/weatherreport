import { Card } from "react-bootstrap";
import "./style.scss";

const ReportCard = ({ report }) => {
  let days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  return (
    <Card
      id="cardUnit"
      key={report.dt_txt}
      style={{ width: "15rem" }}
      className="justify-content-md-center"
    >
      <img
        className="card-img-top"
        style={{ height: "150px", width: "150px" }}
        src={`https://openweathermap.org/img/wn/${report.weather[0].icon}@4x.png`}
        alt=""
      ></img>
      <div id="cardText">
        <h4 id="cardDateHour">
          {days[new Date(report.dt * 1000).getDay()]}{" "}
          {new Date(report.dt * 1000).getDate()}
          {" / "}
          {new Date(report.dt * 1000).getHours()}h
        </h4>
        <h6 id="cardWeather">{report.weather[0].description.charAt(0).toUpperCase()+report.weather[0].description.slice(1)}</h6>
        <h2 id="cardTemperature">{Math.floor(report.main.temp_max)}°C</h2>
      </div>
    </Card>
  );
};

export default ReportCard;

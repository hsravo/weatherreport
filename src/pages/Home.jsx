import React, { useState, useEffect } from "react";
import { Button, Form, Jumbotron, Container } from "react-bootstrap";
import {
  faCompass,
  faMapPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavHome from "../components/NavHome";
import CityReport from "../components/CityReport";
import cities from "../data/cities.json";
import moon from "../assets/video/moon.mp4";
import sky from "../assets/video/sky.mp4";
import "./index.scss";

const APIKEY = "c911e035070122cd8ab54a2fd22a2269";

const Home = () => {
  const [currentTime] = useState(new Date());
  const [searchCity, setSearchCity] = useState("");
  const [results, setResults] = useState("");

  const fetchCity = () => {
    const searchTerm = searchCity.trim();
    if (searchTerm !== "") {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&cnt=12&units=metric&lang=fr&appid=${APIKEY}`
      )
        .then((response) => response.json())
        .then((response) => setResults(response))
        .catch((error) => console.error(error));
    }
  };

  const fetchLocal = () => {
    console.log("geo on");
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=12&units=metric&lang=fr&appid=${APIKEY}`
      )
        .then((response) => response.json())
        .then((response) => setResults(response))
        .catch((error) => console.error(error));
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setSearchCity(value);
    event.preventDefault();
  };

  const resetAll = () => {
    setSearchCity("");
    setResults("");
  };

  return (
    <div id="fullHomepage">
      <NavHome />
      <video autoPlay muted loop id="my-video">
        {currentTime.getHours() >= 18 ? (
          <source src={moon} />
        ) : (
          <source src={sky} />
        )}
      </video>
      <div id="title">
        {currentTime.getHours() >= 18 ? (
          <p id="mainTitle">BONSOIR</p>
        ) : (
          <p id="mainTitle">BONJOUR</p>
        )}
        <p id="subTitle">Quel temps fera-t-il...</p>
      </div>
      <Container id="searchEngine">
        <Button id="buttonLocation" variant="success" onClick={fetchLocal}>
          <FontAwesomeIcon icon={faMapPin} /> ...CHEZ MOI !
        </Button>
        <div id="searchSelect">
          <span id="searchSelect-title">ou à...</span>
          <Form.Control
            id="searchSelect-dropdown"
            as="select"
            placeholder="Choisissez une région..."
          >
            <option value="">Choisissez une région</option>
          {cities.locations.map((location) => 
            <option>{location.region}</option>
          )}
          </Form.Control>
          <Form.Control
            id="searchSelect-dropdown"
            as="select"
            placeholder="Choisissez une ville..."
            value={searchCity}
            onChange={handleChange}
          >
            <option value="">Choisissez une ville</option>
            <option>Paris</option>
            <option>Londres</option>
            <option>Berlin</option>
            <option>Madrid</option>
            <option>Bruxelles</option>
          </Form.Control>
          <Button id="buttonCity" onClick={fetchCity}>
            <FontAwesomeIcon icon={faLocationArrow} />
          </Button>
        </div>
        <Button id="buttonReset" onClick={resetAll}>
          RÉINITIALISER
        </Button>
        <CityReport results={results} />
      </Container>
    </div>
  );
};

export default Home;

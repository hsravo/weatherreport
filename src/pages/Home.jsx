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
import Footer from "../components/Footer";
import regions from "../data/cities.js";
import moon from "../assets/video/moon.mp4";
import sky from "../assets/video/sky.mp4";
import "./index.scss";

const APIKEY = "c911e035070122cd8ab54a2fd22a2269";

const Home = () => {
  const [currentTime] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState();
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

  const regionChange = (e) => {
    const choice = e.target.value;
    setSelectedRegion(regions.find((region) => {
      return region.name === choice
    }));
  };

  useEffect(() => {
    console.log(selectedRegion);
    regions.filter((location) => String(location.name) === selectedRegion);
  }, [selectedRegion]);

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
      <video autoPlay muted loop id="my-video">
        {currentTime.getHours() >= 18 ? (
          <source src={moon} />
        ) : (
          <source src={sky} />
        )}
      </video>
      <NavHome />
      <Container id="searchEngine">
        <div id="title">
          {currentTime.getHours() >= 18 ? (
            <p id="mainTitle">BONSOIR</p>
          ) : (
            <p id="mainTitle">BONJOUR</p>
          )}
          <p id="subTitle">Quel temps fera-t-il...</p>
        </div>
        <Button id="buttonLocation" variant="success" onClick={fetchLocal}>
          <FontAwesomeIcon icon={faMapPin} /> ...CHEZ MOI !
        </Button>
        <div id="searchSelect">
          <span id="searchSelect-title">ou à...</span>
          <Form.Control
            id="searchSelect-dropdown"
            as="select"
            placeholder="Choisissez une région..."
            onChange={regionChange}
          >
          <option value="">Région</option>
            {regions.map((region) => (
              <option value={region.name} key={region.name}>
                {region.name}
              </option>
            ))}
          </Form.Control>
          {selectedRegion ? (
          <Form.Control
            id="searchSelect-dropdown"
            as="select"
            placeholder="Choisissez une ville..."
            value={searchCity}
            onChange={handleChange}
          >
            {selectedRegion.cities?.map((city) =>
          <option>{city}</option>
          )}
          </Form.Control>
          ) : (
            <>
            </>
          )}
          <Button id="buttonCity" onClick={fetchCity}>
            <FontAwesomeIcon icon={faLocationArrow} />
          </Button>
        </div>
        <Button id="buttonReset" onClick={resetAll}>
          RÉINITIALISER
        </Button>
      </Container>
      <CityReport results={results} />
      <Footer />
    </div>
  );
};

export default Home;

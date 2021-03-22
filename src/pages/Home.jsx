import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { faMapPin, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavHome from "../components/NavHome";
import CityReport from "../components/CityReport";
import Footer from "../components/Footer";
import regions from "../data/cities.js";
import moon from "../assets/video/moon.mp4";
import rocamadour from "../assets/video/rocamadour.mp4";
import "./index.scss";

const APIKEY = process.env.REACT_APP_API_SECRET_KEY;

const Home = () => {
  const [currentTime] = useState(new Date());
  const [selectedRegion, setSelectedRegion] = useState();
  const [searchCity, setSearchCity] = useState("");
  const [results, setResults] = useState("");

  const fetchCity = () => {
    const searchTerm = searchCity.trim();
    if (searchTerm !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm},FR&cnt=12&units=metric&lang=fr&appid=${APIKEY}`
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=12&units=metric&lang=fr&appid=${APIKEY}`
      )
        .then((response) => response.json())
        .then((response) => setResults(response))
        .catch((error) => console.error(error));
    });
  };

  const regionChange = (e) => {
    const choice = e.target.value;
    setSelectedRegion(
      regions.find((region) => {
        return region.name === choice;
      })
    );
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
    setSelectedRegion("");
    setSearchCity("");
    setResults("");
  };

  return (
    <div id="fullHomepage">
      <video autoPlay muted loop id="my-video">
        {currentTime.getHours() >= 18 ? (
          <source src={moon} />
        ) : (
          <source src={rocamadour} />
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
        <Button id="buttonLocation" onClick={fetchLocal}>
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
            <option value="">Choisissez une région</option>
            {regions.map((region, index) => (
              <option value={region.name} key={index}>
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
              <option value="">Choisissez une ville</option>
              {selectedRegion.cities?.map((city, idx) => (
                <option value={city} key={idx}>
                  {city}
                </option>
              ))}
            </Form.Control>
          ) : (
            <></>
          )}
          <Button id="buttonCity" onClick={fetchCity}>
            GO {"  "}
            <FontAwesomeIcon icon={faLocationArrow} />
          </Button>
        </div>
        {results ? (
          <>
            <div className="scrollingDown">
              <div className="mousey">
                <div className="scroller"></div>
              </div>
            </div>
            <CityReport results={results} />
            <Button id="buttonReset" onClick={resetAll}>
              RÉINITIALISER
            </Button>
          </>
        ) : (
          <div className="ringLoader"></div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

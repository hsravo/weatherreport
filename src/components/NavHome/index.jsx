import Navbar from "react-bootstrap/Navbar";
import {Button} from "react-bootstrap";
import Clock from "../Clock";
import "./style.scss";

const NavHome = () => {
    return (
      <Navbar id="nav">
        <Navbar.Brand id="main-title">
        WeatherReport
        <Clock />
        </Navbar.Brand>
        <Button id="main-button" href="https://github.com/hsravo/reactmovies" target="_blank">
          À PROPOS
        </Button>
      </Navbar>
    )
}

export default NavHome;
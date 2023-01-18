import React from "react";
import logo from "../../assets/logo.svg";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className={classes.homeHeader}>
        <img src={logo} className={classes.logo} alt="logo" />
        <p className={classes.headerTitle}>Mancala</p>
        <button
          className={classes.headerButton}
          onClick={() => {
            navigate("/play");
          }}
        >
          Player vs Computer
        </button>
        <button
          className={classes.headerButton}
          onClick={() => {
            navigate("/player-vs-player");
          }}
        >
          Player vs Player
        </button>
        <button
          className={classes.headerButton}
          onClick={() => {
            navigate("/computer-vs-computer");
          }}
        >
          Computer vs Computer
        </button>
      </div>
    </div>
  );
}

export default Home;

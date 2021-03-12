import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./App.css";
import Sign_in from "./Sign_In.js";

function Home(props) {
  return (
    <div>
      <Jumbotron className="text-center" id="home_heading">
        <h1>Welcome!</h1>
        <p>Stay motivated to complete courses with a partner!</p>
      </Jumbotron>
      <Sign_in />
    </div>
  );
}

export default Home;

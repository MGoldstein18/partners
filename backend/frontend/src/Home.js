import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import './App.css'

function Home(props) {
  return (
    <Jumbotron className="text-center" id="home_heading">
      <h1>Welcome!</h1>
      <p>Stay motivated to complete courses with a partner!</p>
    </Jumbotron>
  );
}

export default Home;

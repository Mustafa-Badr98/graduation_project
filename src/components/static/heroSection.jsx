import React from "react";
import "./heroSectionCSS.css";
import { useHistory } from "react-router-dom";
const HeroSection = () => {
  const history = useHistory();
  const clickHandler = () => {
    history.push("/register");
  };
  return (
    <>
      <div className="Hero">
        <div className="overlay"></div>
        <div className="Hero-content">
          <div className="container">
            <div className="offset-3 row">
              <div className="col">
                <h1 className="text-light">To each their home.®</h1>
              </div>
            </div>
            <div className="offset-3 row">
              <div className="col text-white fs-4">
                Let’s find a home that’s perfect for you
              </div>
            </div>
            <div className="offset-3 row">
              <div className=" col text-white fs-5">
                Sign Up Now to find yours
              </div>
            </div>
            <div className="offset-3 row mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

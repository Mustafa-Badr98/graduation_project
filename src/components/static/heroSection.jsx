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
                <h1 className="text-light">Your next property is here.</h1>
              </div>
            </div>
            <div className="offset-3 row">
              <div className="col text-white fs-4">
                Let's find a home that's perfect for you
              </div>
            </div>
            <div className="row mt-4">
              <div className="offset-1 col-2">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Purpose{" "}
                </label>
                <select
                  defaultValue="Sell"
                  id="purposeSelect"
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
              <div className="col-6">
                <label className="text-light" htmlFor="floatingInput">
                  Location
                </label>
                <div className="form">
                  <input
                    type="text"
                    className="form-control text-dark "
                    id="floatingInput"
                    placeholder="ex. Monofia"
                  />
                </div>
              </div>
              <div className="col-2">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Property Type{" "}
                </label>
                <select
                  defaultValue="Villas For Sale"
                  id="purposeSelect"
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option className="fs-6" value="Apartments & Duplex for Sale">
                    Apartments & Duplex for Sale
                  </option>
                  <option value="Villas For Sale">Villas For Sale</option>
                  <option value="Vacation Homes for Sale">
                    Vacation Homes for Sale
                  </option>
                  <option value="Commercial for Sale">
                    Commercial for Sale
                  </option>
                </select>
              </div>
            </div>
            <div className="row mt-4">
              <div className="offset-1 col-2">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Area{" "}
                </label>
                <select
                  defaultValue=""
                  id="purposeSelect"
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option value="" disabled hidden>
                    Select area
                  </option>
                  <option value="100">100M</option>
                  <option value="200">200M</option>
                </select>
              </div>
              <div className="col-3">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Beds / Bathrooms{" "}
                </label>
                <select
                  defaultValue=""
                  id="purposeSelect"
                  className="form-select "
                  aria-label="Default select example"
                >
                  <option value="" disabled hidden></option>
                  <option value="100">1 Bed 1 Bath</option>
                  <option value="200">2 Bed 2 Bath</option>
                </select>
              </div>
              <div className="col-3">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Price{" "}
                </label>
                <div className="form">
                  <input
                    type="text"
                    className="form-control text-dark "
                    id="floatingInput"
                    placeholder="Enter your price"
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="btn btn-danger w-100 mt-4">Find</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

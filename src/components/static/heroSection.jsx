import React, { useState } from "react";
import "./heroSectionCSS.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetProductsListByFilterAction } from "../../store/actions/GetProductListByFilterAction";

const HeroSection = () => {
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState({
    purpose: "",
    location: "",
    area_max: "",
    area_min: "",
    bedrooms: "",
    bathrooms: "",
    price_max: "",
    price_min: "",
  });

  const handelSearchButton = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/properties/filtered/",
      {
        params: {
          location__icontains: searchData.location,
          area_size__gte: searchData.area_min,
          area_size__lte: searchData.area_max,
          number_of_bathrooms__icontains: searchData.bathrooms,
          number_of_bedrooms__icontains: searchData.bedrooms,
          price__gte: searchData.price_min,
          price__lte: searchData.price_max,
          type__icontains: searchData.purpose,
        },
      }
    );

    console.log(response.data);

    dispatch(GetProductsListByFilterAction(response.data));
    history.push("/searchResult");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "area_min") {
      setSearchData({
        ...searchData,
        area_min: value,
      });
      console.log(searchData);
    } else if (name === "area_max") {
      setSearchData({
        ...searchData,
        area_max: value,
      });
      console.log(searchData);
    } else if (name === "bathrooms") {
      setSearchData({
        ...searchData,
        bathrooms: value,
      });
      console.log(searchData);
    } else if (name === "bedrooms") {
      setSearchData({
        ...searchData,
        bedrooms: value,
      });
      console.log(searchData);
    } else if (name === "price_min") {
      setSearchData({
        ...searchData,
        price_min: value,
      });
      console.log(searchData);
    } else if (name === "price_max") {
      setSearchData({
        ...searchData,
        price_max: value,
      });
      console.log(searchData);
    } else if (name === "location") {
      setSearchData({
        ...searchData,
        location: value,
      });
      console.log(searchData);
    } else if (name === "purpose") {
      setSearchData({
        ...searchData,
        purpose: value,
      });
      console.log(searchData);
    }
  };

  const egyptGovernorates = [
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matrouh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
  ];

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
                  name="purpose"
                  value={searchData.purpose}
                  onChange={handleInputChange}
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
                <select
                  name="location"
                  className="form-select "
                  aria-label="Default select example"
                  value={searchData.location}
                  onChange={handleInputChange}
                >
                  <option selected value="">
                    All Egypt
                  </option>
                  {egyptGovernorates.map((governorate, index) => {
                    return (
                      <option name="location" key={index} value={governorate}>
                        {" "}
                        {governorate}{" "}
                      </option>
                    );
                  })}
                </select>
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

                <div className="dropdown">
                  <button
                    style={{ width: "100%" }}
                    className="text-start btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    min {searchData.area_min}M , max {searchData.area_max}M{" "}
                  </button>
                  <div className="dropdown-menu" style={{ width: "100%" }}>
                    <div className="row">
                      <div className="offset-2 col-5">Min</div>
                      <div className=" col-5">Max</div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <input
                          value={searchData.area_min}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="0"
                          name="area_min"
                        />
                      </div>
                      <div className="col-5">
                        <input
                          value={searchData.area_max}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="any"
                          name="area_max"
                        />
                      </div>
                    </div>
                    {/* <div className="row mt-2">
                      <div className="offset-1 col-5">
                        <button
                          type="button"
                          className="btn btn-light"
                          style={{ scale: ".9" }}
                        >
                          Reset
                        </button>
                      </div>
                      <div className="col-5">
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ scale: ".9" }}
                        >
                          submit
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Beds / Bathrooms{" "}
                </label>
                <div className="dropdown">
                  <button
                    style={{ width: "100%" }}
                    className="text-start btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    bathrooms ({searchData.bathrooms}) bedrooms: (
                    {searchData.bedrooms}){" "}
                  </button>
                  <div className="dropdown-menu" style={{ width: "100%" }}>
                    <div className="row">
                      <div className="offset-1 col-5">Bathrooms</div>
                      <div className=" col-5">Bedrooms</div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <input
                          value={searchData.bathrooms}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="0"
                          name="bathrooms"
                        />
                      </div>
                      <div className="col-5">
                        <input
                          value={searchData.bedrooms}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="0"
                          name="bedrooms"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <label className="text-light" htmlFor="purposeSelect">
                  {" "}
                  Price{" "}
                </label>
                <div className="dropdown">
                  <button
                    style={{ width: "100%" }}
                    className="text-start btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    min {searchData.price_min}$ , max {searchData.price_max}${" "}
                  </button>
                  <div className="dropdown-menu" style={{ width: "100%" }}>
                    <div className="row">
                      <div className="offset-2 col-5">Min</div>
                      <div className=" col-5">Max</div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-5">
                        <input
                          value={searchData.price_min}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="0"
                          name="price_min"
                        />
                      </div>
                      <div className="col-5">
                        <input
                          value={searchData.price_max}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control border-2 ms-3"
                          pattern="[0-9]*"
                          placeholder="any"
                          name="price_max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <button
                  onClick={handelSearchButton}
                  className="btn btn-danger w-100 mt-4"
                >
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

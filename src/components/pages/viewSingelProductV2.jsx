import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import cx from "classnames";

import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ViewSinglePageProductModal from "../static/ViewSinglePageProductModal";

const ViewSingleProductPageV2 = () => {
  const param = useParams();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);
  const [product, setProduct] = useState({});
  const productList = useSelector((state) => state.Products.productList);
  const [filteredObject, setFilteredObject] = useState([]);
  const [seller, setSeller] = useState({});

  const addToFavHandler = () => {
    if (is_fav) {
      dispatch(UpdateFavCountRemove(product));
      setFav(false);
    } else {
      dispatch(UpdateFavCountAdd(product));
      setFav(true);
    }
  };
  const checkIsFav = (product) => {
    const sessionStorageKeys = Object.keys(sessionStorage);
    if (sessionStorageKeys.includes(product.id.toString())) {
      setFav(true);
    }
  };

  const getProductData = () => {
    let productId = parseInt(param.id);
    let filteredObj = productList.find((obj) => obj.id === productId);
    setFilteredObject(filteredObj);
    setSeller(filteredObj.sellerUser);
  };

  function showFilteredObject() {
    console.log(filteredObject.sellerUser.username);
  }
  const getMap = () => {
    if (!mapRef.current) {
      const productLocation = { lat: 37.7749, lng: -122.4194 };
      const map = L.map("map").setView(productLocation, 15);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(map);

      L.marker(productLocation)
        .addTo(map)
        .bindPopup("Live Location")
        .openPopup();

      mapRef.current = map;
      console.log("1");
    }
  };
  useEffect(() => {
    getProductData();
    getMap();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-2 col-7 ms-4 px-1">
            <img style={{ height: "480px" }} src={filteredObject.photo} />
          </div>
          <div
            data-bs-toggle="modal"
            data-bs-target="#viewProductsModal"
            className="col-3"
          >
            <img style={{ height: "14.5rem" }} src={filteredObject.photo} />{" "}
            <img
              style={{ height: "14.5rem" }}
              className="mt-3"
              src={filteredObject.photo}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="offset-2 col-7 ms-4 px-1">
            <div className="row">
              <p style={{ color: "silver" }} className="fs-5 fw-bold">
                {" "}
                {filteredObject.title}
              </p>
            </div>

            <div className="row py-0">
              <span className="fs-5">
                {" "}
                Available Area for {filteredObject.type} at{" "}
                {filteredObject.location} {filteredObject.propertySize}M.
              </span>
            </div>
            <div className="row py-0 mt-3 ">
              <div className="col-6">
                <div>
                  <i className="fa-solid fa-building me-2"></i>
                  <span>Property Type : </span>
                  <span>Open Space </span>
                </div>

                <div className="mt-2">
                  <i className="fa-solid fa-bath me-2"></i>
                  <span>Bathrooms : </span>
                  <span>{filteredObject.numOfBathrooms} </span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <i className="fa-solid fa-expand me-2"></i>
                  <span>Property Size : </span>
                  <span>{filteredObject.propertySize} M</span>
                </div>

                <div className="mt-2">
                  <i className="fa-regular fa-calendar me-2"></i>
                  <span>Available From : </span>
                  <span>{filteredObject.timeStamp} </span>
                </div>
              </div>
            </div>
            <div className="row mt-4 ">
              <div className="container">
                <hr />
              </div>
            </div>
            <div className="row py-0 mt-3 ">
              <div className="col-6">
                <div className="pb-4 fs-5 fw-bold">Location: </div>
                <div className="row">
                  <span
                    className=""
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "50%",
                    }}
                    id="map"
                  ></span>

                  <div className="col-6 mt-4 ms-4">
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
              <div className="offset-1 col-5">
                <div className="pb-4 fs-5 fw-bold">Agent: </div>
                <div className="row">
                  <div className="col-6">
                    <span className="">
                      <img
                        style={{
                          height: "150px",
                          width: "150px",
                          borderRadius: "50%",
                        }}
                        src="http://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                      />
                    </span>
                  </div>

                  <div className="col-6 mt-4 ">
                    
                    {seller ? (
                      <>
                        <div className="row ms-2 fs-5 fw-bold">{seller.username}</div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 ">
              <div className="container">
                <hr />
              </div>
            </div>
            <div className="row mt-4 ">
              <span className="fs-5 fw-bold">Description :</span>
              <div className="container mt-5">
                {filteredObject.description}
              </div>
            </div>
          </div>

          <div
            style={{ height: "11.8rem", width: "23rem" }}
            className="col-3 border border-2 ms-2"
          >
            <div className="fs-1 text-dark">
              <div className="row px-5">
                <div className=" fs-5 ">{product.price} EGP / Month</div>
              </div>
            </div>
            <div className="row mt-4 ">
              <div className="col-4">
                <button className="btn btn-danger">
                  <i className="fs-6 fa-solid fa-phone me-3 ms-3"></i>
                  Call
                </button>
              </div>{" "}
              <div className="col-4">
                <button className="btn btn-info">
                  <i className="fs-6 fa-solid fa-envelope ms-4 me-4"></i>
                  Email
                </button>
              </div>{" "}
              <div className="col-4">
                <button className="btn btn-success">
                  <i className="fa-brands fa-whatsapp"></i>WhatsUp
                </button>
              </div>
            </div>
            <div className="row">
              <div className="container">
                <hr className="mt-3 " />
              </div>
            </div>
            <div className="row">
              <div className="container">
                <div className="offset-2 col-8 border border-1 rounded">
                  <span className="px-4">
                    <i className="fa-regular fa-heart me-1"></i> Save to Fav
                    List
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ViewSinglePageProductModal productPhotos={filteredObject.photo} />
      <MyFooter />
    </>
  );
};

export default ViewSingleProductPageV2;

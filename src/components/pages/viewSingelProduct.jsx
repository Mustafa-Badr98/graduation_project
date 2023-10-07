import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import cx from "classnames";

import viewSinglePageStyles from "./viewSingleProduct.module.css";
import MyFooter from "../static/footer";
import { useDispatch } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import { AddToCartAction } from "../../store/actions/AddToCart";
import AddToCartModal from "../static/AddToCartModal";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const ViewSingleProductPage = () => {
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);

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
  const AddCartHandlerButton = () => {
    // if (isLogedIn) {
    dispatch(AddToCartAction(product));

    // } else {
    // alert("you must be logged in to add to cart");
    // }
  };
  const param = useParams();
  const [product, setProduct] = useState({});
  const mapRef = useRef(null);

  const getProductData = async () => {
    await axios
      .get(`https://api-generator.retool.com/lgHeOw/realtor_site/${param.id}`)
      .then((res) => {
        setProduct(res.data);
        checkIsFav(product);
        // console.log(res);
        // console.log(product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData();

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

      // Assign the map to the ref
      mapRef.current = map;
      console.log("1");
    }
  }, [product]);
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div
                  className={cx(
                    viewSinglePageStyles["preview-picstyles"],
                    viewSinglePageStyles["tab-content"]
                  )}
                >
                  <div
                    className={cx(viewSinglePageStyles["tab-pane"], "active")}
                    id="pic-1"
                  >
                    <img src={product.Photos} />
                  </div>
                </div>
                <ul className={`preview-thumbnail nav nav-tabs`}>
                  <li className={`active`}>
                    <a data-target="#pic-1" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-2" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-3" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-4" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-5" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className={cx(viewSinglePageStyles.details, "col-md-6")}>
                <h3 className={viewSinglePageStyles["product-title"]}>
                  {product.Title}
                </h3>
                <div className={viewSinglePageStyles["rating"]}>
                  <div className={viewSinglePageStyles.stars}>
                    <span
                      className={cx("fa fa-star", viewSinglePageStyles.checked)}
                    ></span>
                    <span
                      className={cx("fa fa-star", viewSinglePageStyles.checked)}
                    ></span>
                    <span
                      className={cx("fa fa-star", viewSinglePageStyles.checked)}
                    ></span>
                    <span
                      className={cx("fa fa-star", viewSinglePageStyles.checked)}
                    ></span>
                    <span className={cx("fa fa-star")}></span>
                  </div>
                  <span className={viewSinglePageStyles["review-no"]}>
                    41 reviews
                  </span>
                </div>
                <p className={`product-description`}>{product.Description}</p>
                <h4 className={`price`}>
                  current price: <span>{product.Price} €</span>
                </h4>
                <p className={`vote`}>
                  <strong>91%</strong> of buyers enjoyed this product!{" "}
                  <strong>(87 votes)</strong>
                </p>
                <h5 className={`sizes`}>
                  size:
                  <span
                    className={`ms-2`}
                    data-toggle="tooltip"
                    title="By Meter"
                  >
                    {product["Property size:"]} M
                  </span>
                </h5>

                <div>
                  <button
                    onClick={AddCartHandlerButton}
                    className={`btn`}
                    style={{ backgroundColor: "chocolate" }}
                    data-bs-toggle="modal"
                    data-bs-target="#addToCartModal"
                    type="button"
                  >
                    add to cart
                  </button>
                  {is_fav ? (
                    <>
                      <a
                        onClick={addToFavHandler}
                        className={`text-dark fs-3 ms-4`}
                      >
                        <i className={`fa-solid fa-heart`}></i>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={addToFavHandler}
                        className={`text-dark fs-3 ms-4 `}
                      >
                        <i className={`fa-regular fa-heart`}></i>
                      </a>
                    </>
                  )}
                </div>
                <div className="row mt-5" style={{}}>
                  <div className="offset-6 col-4">
                    <div
                      className=""
                      style={{
                        height: "180px",width:"13rem",borderRadius:"50%"
                      }}
                      id="map"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal />
      <MyFooter />
    </>
  );
};

export default ViewSingleProductPage;

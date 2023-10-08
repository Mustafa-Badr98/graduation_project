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
import ViewSinglePageProductModal from "../static/ViewSinglePageProductModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core";

const ViewSingleProductPageV2 = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  const mapRef = useRef(null);
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

  const getProductData = async () => {
    await axios

      .get(`https://api-generator.retool.com/NlCDT1/realtor/${param.id}`)
      .then((res) => {
        setProduct(res.data);
        // checkIsFav(product);
        console.log(res.data);
        // console.log(product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData();

    // if (!mapRef.current) {
    //   const productLocation = { lat: 37.7749, lng: -122.4194 };
    //   const map = L.map("map").setView(productLocation, 15);

    //   L.tileLayer(
    //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //     {}
    //   ).addTo(map);

    //   L.marker(productLocation)
    //     .addTo(map)
    //     .bindPopup("Live Location")
    //     .openPopup();

    //   mapRef.current = map;
    //   console.log("1");
    // }
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-2 col-7 ms-4 px-1">
            <img style={{ height: "480px" }} src={product.photo} />
          </div>
          <div
            data-bs-toggle="modal"
            data-bs-target="#viewProductsModal"
            className="col-3"
          >
            <img style={{ height: "14.5rem" }} src={product.photo} />{" "}
            <img
              style={{ height: "14.5rem" }}
              className="mt-3"
              src={product.photo}
            />
          </div>
        </div>
      </div>

      <ViewSinglePageProductModal productPhotos={product.photo} />
      <MyFooter />
    </>
  );
};

export default ViewSingleProductPageV2;

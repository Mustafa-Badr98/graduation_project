import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ViewSinglePageProductModal from "../static/ViewSinglePageProductModal";
import ContactEmailSellerButton from "../static/EmailButtonComp";
import axios from "axios";

const ViewSingleProductPageV2 = () => {
  const param = useParams();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);

  const [filteredObject, setFilteredObject] = useState({});
  const [filteredObjectImages, setFilteredObjectImages] = useState([]);
  const [seller, setSeller] = useState({});

  const addToFavHandler = () => {
    if (is_fav) {
      dispatch(UpdateFavCountRemove(filteredObject));
      setFav(false);
    } else {
      dispatch(UpdateFavCountAdd(filteredObject));
      setFav(true);
    }
  };
  // const checkIsFav = (product) => {
  //   const sessionStorageKeys = Object.keys(sessionStorage);
  //   if (sessionStorageKeys.includes(product.id.toString())) {
  //     setFav(true);
  //   }
  // };

  const getProductData = () => {
    // let productId = parseInt(param.id);
    let filteredObj = {};
    let req = axios
      .get(`http://127.0.0.1:8000/api/properties/${param.id}`)

      .then((res) => (filteredObj = res.data.data))
      .then(() => setFilteredObject(filteredObj))
      .then(() => setFilteredObjectImages(filteredObj.images))
      .then(() => setSeller(filteredObj.seller))
      .catch((err) => {
        console.log(err);
      });
    console.log(filteredObjectImages);
    // checkIsFav(filteredObj);))
  };

  // function showFilteredObject() {
  //   console.log(filteredObject.sellerUser.username);
  // }
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
        {filteredObjectImages.length >= 1 ? (
          <>
            <div className="row">
              <div className="col-xl-7 ms-4 px-1">
                <img
                  style={{ height: "480px" }}
                  src={`http://localhost:8000${filteredObjectImages[0].image}`}
                  alt="no"
                />
              </div>
              <div
                data-bs-toggle="modal"
                data-bs-target="#viewProductsModal"
                className="col-xl-4 "
              >
                <img
                  style={{ height: "14.5rem" }}
                  src={`http://localhost:8000${filteredObjectImages[1].image}`}
                  alt="no"
                />{" "}
                <img
                  style={{ height: "14.5rem" }}
                  className="mt-3"
                  src={`http://localhost:8000${filteredObjectImages[2].image}`}
                  alt="no"
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

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
                {filteredObject.location} {filteredObject.area_size}M.
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
                  <span>{filteredObject.number_of_bathrooms} </span>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <i className="fa-solid fa-expand me-2"></i>
                  <span>Property Size : </span>
                  <span>{filteredObject.area_size} M</span>
                </div>

                <div className="mt-2">
                  <i className="fa-regular fa-calendar me-2"></i>
                  <span>Available From : </span>
                  <span>{filteredObject.created_at} </span>
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
                    <span>{filteredObject.location}</span>
                  </div>
                </div>
              </div>
              {seller ? (
                <>
                  <Link
                    to={`/viewUser/${seller.email}`}
                    className="offset-1 col-5 text-dark"
                  >
                    <div className="pb-4 fs-5 fw-bold">
                      Agent: {seller.user_name}{" "}
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <span className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "50%",
                            }}
                            src={`http://localhost:8000${seller.profile_pic}`}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/viewUser/no_user`} className="offset-1 col-5">
                    <div className="pb-4 fs-5 fw-bold">Agent: </div>
                    <div className="row">
                      <div className="col-5">
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
                    </div>
                  </Link>
                </>
              )}
            </div>

            <div className="row mt-4 ">
              <div className="container">
                <hr />
              </div>
            </div>
            <div className="row mt-4 ">
              <span className="fs-5 fw-bold">Description :</span>
              <div className="container mt-5">{filteredObject.description}</div>
            </div>
          </div>

          <div
            style={{ height: "11.8rem", width: "23rem" }}
            className="col-3 border border-2 ms-2"
          >
            <div className="fs-1 text-dark">
              <div className="row px-5">
                <div className=" fs-5 ">{filteredObject.price} EGP / Month</div>
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
                <ContactEmailSellerButton email="muome1234@gmail.com" />
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
                  {is_fav ? (
                    <>
                      <span className="px-4" onClick={addToFavHandler}>
                        <i className="fa-solid fa-heart me-1"></i>{" "}
                        <span style={{ maxWidth: "8rem", maxHeight: ".5rem" }}>
                          Remove From Fav
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="px-4" onClick={addToFavHandler}>
                        <i className="fa-regular fa-heart me-1"></i>{" "}
                        <span style={{ maxWidth: "8rem", maxHeight: ".5rem" }}>
                          Save To Fav
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ViewSinglePageProductModal productPhotos={filteredObjectImages} />
      <MyFooter />
    </>
  );
};

export default ViewSingleProductPageV2;

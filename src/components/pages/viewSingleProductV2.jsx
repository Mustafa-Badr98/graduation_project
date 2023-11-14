import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ViewSinglePageProductModal from "../static/ViewSinglePageProductModal";
import ContactEmailSellerButton from "../static/EmailButtonComp";
import axios from "axios";
import no_profile_pic from "../../assets/images/no-profile.jpg";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";

const ViewSingleProductPageV2 = () => {
  const history = useHistory();
  const param = useParams();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);
  const [filteredObject, setFilteredObject] = useState({});
  const [filteredObjectImages, setFilteredObjectImages] = useState([]);
  const [seller, setSeller] = useState({});
  const [offer_price, setOfferPrice] = useState(0);
  const userInSession = useSelector((state) => state.currentUSER.currentUser);

  const token = localStorage.getItem("authToken");
  const storedAuthToken = localStorage.getItem("authToken");

  console.log(filteredObject);
  const handleOfferPriceChange = (e) => {
    if (e.target.value < 0) {
      setOfferPrice(0);
    } else {
      setOfferPrice(e.target.value);
    }
  };

  const handleSubmitOffer = () => {
    console.log("Offer submitted:", offer_price);
    let data = {
      property_id: filteredObject.id,
      price: offer_price,
    };
    console.log(data);
    try {
      axios
        .post("http://127.0.0.1:8000/api/add_offer/", data, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      alert("offer submitted");
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveButtonHandler = () => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete your Ad? You will not be able to retrieve it afterward."
      );

      if (userConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/properties/${filteredObject.id}`)
          .then((res) => console.log(res))
          .then(() => {
            dispatch(GetCurrentUserAction(storedAuthToken));
            history.push("/");
          });
      } else {
        console.log("Deletion canceled");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
    console.log(filteredObj);
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
              <div
                style={{ maxHeight: "30rem" }}
                className="col-xl-7 ms-4 px-1"
              >
                <img
                  style={{ height: "100%", width: "100%" }}
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
                  style={{ height: "14.5rem", width: "100%" }}
                  src={`http://localhost:8000${filteredObjectImages[1].image}`}
                  alt="no"
                />{" "}
                <img
                  style={{ height: "14.5rem", width: "100%" }}
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
                Available Area {filteredObject.area_size} M at{" "}
                {filteredObject.location}.
              </span>
            </div>
            <div className="row py-0 mt-3 ">
              <div className="col-6">
                <div>
                  <i className="fa-solid fa-building me-2"></i>
                  <span className="ms-2 ps-2">Property Type : </span>
                  <span>For {filteredObject.type}</span>
                </div>

                <div className="mt-2">
                  <i className="fa-solid fa-bath me-2"></i>
                  <span className="ms-2 ps-1">Bathrooms : </span>
                  <span>{filteredObject.number_of_bathrooms} </span>
                </div>
                <div className="mt-2">
                  <i className="fa-solid fa-bed me-2 "></i>
                  <span className="ms-2">Bedrooms : </span>
                  <span>{filteredObject.number_of_bedrooms} </span>
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
                  <span>Published at : </span>
                  <span>{filteredObject.created_at} </span>
                </div>
                <div className="mt-2">
                  <i class="fa-solid fa-eye me-2"></i>
                  <span>Offers : </span>
                  <span className="text-danger">
                    {filteredObject && filteredObject.offers ? (
                      <>{filteredObject.offers.length} </>
                    ) : (
                      <></>
                    )}{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-5 ">
              <span className="fs-5 fw-bold">Description :</span>
              <div className="container mt-3">{filteredObject.description}</div>
            </div>
            <div className="row mt-4 ">
              <div className="container">
                <hr />
              </div>
            </div>
            <div className="row py-0 mt-3 ">
              <div className="col-6">
                <div className="pb-4 fs-5 fw-bold text-dark">
                  Location: {filteredObject.location}
                </div>
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
                          {seller.profile_pic ? (
                            <>
                              <img
                                style={{
                                  height: "150px",
                                  width: "150px",
                                  borderRadius: "50%",
                                }}
                                src={`http://localhost:8000${seller.profile_pic}`}
                                alt=""
                              />
                            </>
                          ) : (
                            <>
                              <img
                                style={{
                                  height: "150px",
                                  width: "150px",
                                  borderRadius: "50%",
                                }}
                                src={no_profile_pic}
                                alt=""
                              />
                            </>
                          )}
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
          </div>

          <div
            style={{ height: "12.8rem", width: "26.5rem" }}
            className="col-3 border border-2 ms-2"
          >
            <div className="fs-1 text-dark">
              <div className="row px-5 text-center">
                <div className=" fs-2 text-danger mt-4">
                  {filteredObject.price} EGP{" "}
                </div>
              </div>
            </div>
            {/* <div className="row mt-4 ">
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
            </div> */}
            {userInSession && seller && seller.id === userInSession.id ? (
              <>
                {" "}
                <div className="row mt-4">
                  <div className="offset-1 col-4 btn btn-secondary">
                    <Link
                      className="text-light"
                      to={`EditPropertyAd/${filteredObject.id}`}
                    >
                      {" "}
                      Edit your ad
                    </Link>
                  </div>
                  <button
                    onClick={RemoveButtonHandler}
                    className="offset-1 col-4 btn btn-danger"
                  >
                    Delete your ad
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="row mt-2 text-center offer-submit">
                  <label className="fw-bold">
                    Price:
                    <input
                      type="number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      min="0"
                      value={offer_price}
                      onChange={handleOfferPriceChange}
                      className="form-control w-75 ms-5 pe-5"
                    />
                  </label>
                </div>
                <div className="row offer-submit">
                  <div className="offset-4 col-6">
                    <button
                      onClick={handleSubmitOffer}
                      className="my-2 btn btn-secondary"
                      type="button"
                    >
                      Submit Offer
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="row">
              <div className="container">
                <hr className="mt-3 " />
              </div>
            </div>
            <div className="row">
              <div className="container">
                {/* <div className="offset-2 col-8 border border-1 rounded">
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
                </div> */}
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

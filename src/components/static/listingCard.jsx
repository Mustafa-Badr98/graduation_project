
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AddToProductListAction } from "../../store/actions/AddToProductList";

import axios from "axios";
import { RefreshUserDataAction } from "../../store/actions/RefreshUserData";



const ListingCard = (props) => {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const token = useSelector((state) => state.TokenStore.token);
  const localProduct = props.productObject;

  const addToFavHandler = () => {
    const endpoint = isFav
      ? `http://127.0.0.1:8000/api/property/RemFav/${localProduct.id}`
      : `http://127.0.0.1:8000/api/property/AddFav/${localProduct.id}`;

    axios
      .post(endpoint, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data.user;
        dispatch(RefreshUserDataAction(userData));
      })
      .catch((err) => {
        console.log(err);
      });

    setIsFav(!isFav);
  };

  // useEffect(() => {
  //   if (Object.keys(user).length !== 0) {
  //     const favIds = user.favorites.map((fav) => fav.id);
  //     setIsFav(favIds.includes(localProduct.id));
  //   }
  // }, [user, localProduct.id]);
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const favIds = user.favorites.map((fav) => fav.id);
      setIsFav(favIds.includes(localProduct.id));
    }
  }, [user, localProduct]);
  return (
    <>
      <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8  mt-5 ">
        <div className="card">
          <img
            style={{ maxHeight: "350px" }}
            src={`http://localhost:8000${localProduct.images[0].image}`}
            alt=""
            className="card-img-top"
          />
          {isFav ? (
            <>
              {" "}
              <i
                onClick={addToFavHandler}
                className="fas fa-heart clickable-heart"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "30px",
                  color: "rgb(232, 46, 47)",
                  cursor: "pointer",
                }}
              ></i>{" "}
            </>
          ) : (
            <>
              <i
                onClick={addToFavHandler}
                className="fas fa-heart clickable-heart"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "30px",
                  color: "black",
                  cursor: "pointer",
                }}
              ></i>{" "}
            </>
          )}

          <div className="card-body">
            <h5 className="card-title">{localProduct.title}</h5>
            <p
              style={{
                height: "45px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="card-text"
            >
              {localProduct.description}
            </p>
            <div className="row align-items-center">
              <div className="col-4">
                <span>
                  <i className="fas fa-th-large"></i>
                  <span> {localProduct.number_of_bedrooms}</span>
                </span>
                <span className="ms-1">Bedrooms</span>
              </div>
              <div className="col-5">
                <span>
                  <i className="fas fa-shower"></i>
                  <span> {localProduct.number_of_bathrooms}</span>
                </span>
                <span className="ms-1">Bathrooms</span>
              </div>
              <div className="col-3">
                <span className="row">
                  <div className="col-12">
                    <i className="fas fa-vector-square"></i>
                    <span className="ms-1">Area</span>
                  </div>
                </span>
                <span>
                  <span>
                    {localProduct.area_size} <span>Sq Ft</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-5 mt-2">
                <span className="fs-6 fw-bold">For {localProduct.type} : </span>
                <span className="ms-1 fs-5 fw-bold">${localProduct.price}</span>
              </div>
              <div className="offset-4 col-2">
                <Link
                  to={`/${localProduct.id}`}
                  style={{ borderRadius: "20px", fontSize: "10px" }}
                  className="btn btn-primary"
                >
                  More Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingCard;












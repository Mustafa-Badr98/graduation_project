import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { RefreshUserDataAction } from "../../store/actions/RefreshUserData";

const ListingCard = (props) => {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const token = useSelector((state) => state.TokenStore.token);
  const localProduct = props.productObject;
  console.log(localProduct);

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
            style={{ maxHeight: "200px" }}
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
                height: "85px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "",
              }}
              className="card-text "
            >
              {localProduct.description}
            </p>
            <div className="row align-items-center mt-3">
              <div className="col-4">
                <span>
                  <i className="fas fa-th-large"></i>
                  <span> {localProduct.number_of_bedrooms}</span>
                </span>
                <span className="ms-1">Bedrooms</span>
              </div>
              <div className="col-4">
                <span>
                  <i className="fas fa-shower"></i>
                  <span> {localProduct.number_of_bathrooms}</span>
                </span>
                <span className="ms-1">Bathrooms</span>
              </div>
              <div className="col-4">
                <span className="row">
                  <div className="col-12">
                    <i className="fas fa-vector-square me-1"></i>
                    <span>
                      Area{" "}
                      <span className="ms-1">{localProduct.area_size} M </span>
                    </span>
                  </div>
                </span>
                <span>
                  <span></span>
                </span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6 mt-2">
                <span className="fs-6 fw-bold">For {localProduct.type} : </span>
                <div className="row">
                  <span className="fs-5 fw-bold">
                    <span className="text-danger">{localProduct.price} </span>{" "}
                    EGP
                  </span>
                </div>
              </div>
              <div className="offset-3 col-2 mt-3">
                <Link
                  to={`/${localProduct.id}`}
                  style={{ borderRadius: "20px", fontSize: "10px" }}
                  className="btn btn-secondary"
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

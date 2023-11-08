import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AddToProductListAction } from "../../store/actions/AddToProductList";

const ListingCard = (props) => {
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const user_fav = user.favorites;
  const localProduct = props.productObject;
  console.log(localProduct)

  const addToFavHandler = () => {
    if (is_fav) {
      dispatch(UpdateFavCountRemove(localProduct));
      setFav(false);
    } else {
      dispatch(UpdateFavCountAdd(localProduct));
      setFav(true);
    }
    // checkIsFav();
  };

  const checkIsFavWhenMountAndUnMount = () => {
    if (Object.keys(user).length === 0) {
    } else {
      const fav_ids = user_fav.map((fav) => fav.id);
      if (fav_ids.includes(localProduct.id)) {
        console.log("found");
        setFav(true);
      } else {
        console.log("not found");
        setFav(false);
      }
    }
  };

  useEffect(() => {
    setFav(false);
    checkIsFavWhenMountAndUnMount();
  }, [user]);
  return (
    <>
      <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8  mt-5 ">
        <div className="card">
          <img
            style={{ maxHeight: "350px" }}
            src={`http://localhost:8000${localProduct.image}`}
            alt=""
            className="card-img-top"
          />
          {is_fav ? (
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
                  color: "chocolate",
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

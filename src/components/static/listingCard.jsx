import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AddToProductListAction } from "../../store/actions/AddToProductList";

const ListingCard = (props) => {
  const dispatch = useDispatch();
  const localProduct = props.productObject;
  const [is_fav, setFav] = useState(false);

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
    const sessionStorageKeys = Object.keys(sessionStorage);
    try {
      if (sessionStorageKeys.includes(localProduct.id.toString())) {
        setFav(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFav(false);
    checkIsFavWhenMountAndUnMount();
  }, []);
  return (
    <>
      <div className="col-xl-3 col-lg-5 col-md-6 col-sm-8 offset-1 mt-5">
        <div className="card">
          <img src={localProduct.photo} alt="" className="card-img-top" />
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
            <p className="card-text">{localProduct.description}</p>
            <div className="row align-items-center">
              <div className="col">
                <span>
                  <i className="fas fa-th-large"></i>
                  <span> {localProduct.numOfBedrooms}</span>
                </span>
                <span className="ms-1">Bedrooms</span>
              </div>
              <div className="col">
                <span>
                  <i className="fas fa-shower"></i>
                  <span> {localProduct.numOfBathrooms}</span>
                </span>
                <span className="ms-1">Bathrooms</span>
              </div>
              <div className="col">
                <span className="row">
                  <div className="col-12">
                    <i className="fas fa-vector-square"></i>
                    <span>Area</span>
                  </div>
                </span>
                <span>
                  <span>
                    {localProduct.propertySize} <span>Sq Ft</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-5 mt-2">
                <span className="fs-6 fw-bold">For {localProduct.type} : </span>
                <span className="ms-1 fs-5 fw-bold">${localProduct.price}</span>
              </div>
              <div className="offset-2 col-2">
                <Link
                  to={`/${localProduct.id}`}
                  style={{ borderRadius: "20px", fontSize: "10px" }}
                  className="btn btn-primary"
                >
                  More Details
                </Link>
              </div>
              <div className="col-2">
                <span
                  style={{ borderRadius: "20px", fontSize: "10px" }}
                  className="btn btn-secondary"
                >
                  Contact Seller
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingCard;

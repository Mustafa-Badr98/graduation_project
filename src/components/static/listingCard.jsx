import React, { useState } from "react";

const ListingCard = () => {
  const [heartFav, setHeartFav] = useState(false);
  const togglerHeart = () => {
    if (heartFav === false) {
      setHeartFav(true);
    } else {
      setHeartFav(false);
    }
  };
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-10 ">
        <div className="card">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg"
            alt=""
            className="card-img-top"
          />
          {heartFav ? (
            <>
              {" "}
              <i
                onClick={togglerHeart}
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
                onClick={togglerHeart}
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
            <h5 className="card-title">Villa In Cairo</h5>
            <p className="card-text">
              The very best waterfront location in Tahrir square and beside many
              cool places
            </p>
            <div className="row align-items-center">
              <div className="col">
                <span>
                  <i className="fas fa-th-large"></i>
                  <span> 3</span>
                </span>
                <span className="ms-1">Bedrooms</span>
              </div>
              <div className="col">
                <span>
                  <i className="fas fa-shower"></i>
                  <span> 2</span>
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
                    1800<span>Sq Ft</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6 mt-2">
                <span>For Sale</span>
                <span className="ms-1 fw-bold">$410,000</span>
              </div>
              <div className="offset-2 col-4">
                <span
                  style={{ borderRadius: "20px", fontSize: "14px" }}
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

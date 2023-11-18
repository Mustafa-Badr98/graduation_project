import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserProductModal from "./EditUserProductModal";
import { DeleteUserProductAction } from "../../store/actions/DeleteUserProduct";
import { DeleteFromProductListAction } from "../../store/actions/DeleteFromProductList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import sold_pic from "../../assets/images/sold.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ConfirmationModal from "./confirmModal";

const UserCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowDeleteConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const storedAuthToken = localStorage.getItem("authToken");

  const localProduct = props.productObject;
  console.log(localProduct);

  useEffect(() => {}, []);

  const DeleteAdHandler = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/properties/${localProduct.id}`)
      .then((res) => console.log(res))
      .then(() => dispatch(GetCurrentUserAction(storedAuthToken)));
  };
  return (
    <>
      <div className="container my-5 ">
        <div
          // to={`/${localProduct.id}`}
          className="card border border-2 text-dark "
          style={{ height: "300px", textDecoration: "none" }}
        >
          {localProduct.state === "sold" && (
            <>
              <img
                src={sold_pic}
                alt=""
                srcset=""
                style={{ width: "150px", position: "absolute", left: "70rem" }}
              />
            </>
          )}

          <div
            className="row"
            style={{ height: "300px", textDecoration: "none" }}
          >
            <div className="col-5">
              <img
                src={`http://localhost:8000${localProduct.images[0].image}`}
                className="img-fluid rounded-start w-75 h-100"
                alt="..."
              />
            </div>
            <div className=" col-lg-6 ">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <h5 className="card-title">{localProduct.title}</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="card-title">
                      <span className="text-danger">{localProduct.price} </span>{" "}
                      EGP
                    </h5>
                  </div>
                </div>

                <p
                  style={{
                    maxHeight: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "",
                  }}
                  className="card-text pt-3"
                >
                  {localProduct.description}
                </p>
                <h5 className="card-text pt-3">
                  Size : <strong>{localProduct.area_size} M </strong>
                </h5>
                {localProduct.state === "live" && (
                  <div className="row mt-5">
                    <div className="col-2">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`EditPropertyAd/${localProduct.id}`}
                        className="card-link text-light btn btn-secondary"
                      >
                        Edit Ad
                      </Link>
                    </div>
                    <div className="col-3">
                      <button
                        className="btn btn-danger"
                        onClick={handleShowDeleteConfirm}
                        style={{ textDecoration: "none" }}
                      >
                        Delete Ad
                      </button>
                    </div>
                    <div className="col-4">
                      <Link
                        to={`/Property/${localProduct.id}/Offers/`}
                        className="text-dark ms-4 mt-1 fs-5 "
                        style={{ textDecoration: "none" }}
                      >
                        Offers{" "}
                        <span
                          style={{ borderRadius: "40%" }}
                          className="bg-danger fs-5 text-light px-1"
                        >
                          {" "}
                          {localProduct.offers.length}
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={DeleteAdHandler}
        body={"Are you sure you want to delete your AD ?"}
      />
    </>
  );
};

export default UserCard;

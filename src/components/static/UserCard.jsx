import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserProductModal from "./EditUserProductModal";

const UserCard = (props) => {
  const dispatch = useDispatch();

  const localProduct = props.productObject;
  //   console.log(localProduct);

  useEffect(() => {}, []);

  return (
    <>
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={{ border: "none" }}>
          <div className="row">
            <div className="offset-1 col-lg-6 col">
              <img
                src={localProduct.photo}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="offset-1 col-lg-4 ">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h5 className="card-title">{localProduct.title}</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="card-title">{localProduct.price} €</h5>
                  </div>
                </div>

                <p className="card-text pt-3">{localProduct.description}</p>
                <h5 className="card-text pt-3">
                  Size : <strong>{localProduct.propertySize} M </strong>
                </h5>

                <p className="card-text">
                  <small className="text-muted">
                    Last updated {localProduct.timeStamp}
                  </small>
                </p>

                <div className="card-body d-flex justify-content-end">
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    className="card-link text-light btn btn-secondary"
                  >
                    Edit
                  </span>
                  <a
                    onClick={() => {}}
                    className="card-link text-light btn "
                    style={{ backgroundColor: "chocolate" }}
                    data-bs-toggle="modal"
                    data-bs-target="#addToCartModal"
                  >
                    Remove
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditUserProductModal productObject={localProduct} />
    </>
  );
};

export default UserCard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserProductModal from "./EditUserProductModal";
import { DeleteUserProductAction } from "../../store/actions/DeleteUserProduct";
import { DeleteFromProductListAction } from "../../store/actions/DeleteFromProductList";

const UserCard = (props) => {
  const dispatch = useDispatch();

  const localProduct = props.productObject;
  //   console.log(localProduct);

  useEffect(() => {}, []);

  const RemoveButtonHandler = () => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete your Ad? You will not be able to retrieve it afterward."
      );

      if (userConfirmed) {
        dispatch(DeleteUserProductAction(localProduct));
        dispatch(DeleteFromProductListAction(localProduct));
      } else {
        console.log("Deletion canceled");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    onClick={RemoveButtonHandler}
                    className="card-link text-light btn "
                    style={{ backgroundColor: "chocolate" }}
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

import React from "react";
import { useDispatch } from "react-redux";
import { RemoveFromCartAction } from "../../store/actions/RemoveFromCart";
import { AddToCartAction } from "../../store/actions/AddToCart";
import { MinFromCart } from "../../store/actions/MinFromCart";

const CartItemComp = (props) => {
  const item = props.itemObject;
  const dispatch = useDispatch();



  const quantityFieldChangeHandler=()=>{
    
  }
  const handelAddToQuantityInCartButton = () => {
    dispatch(AddToCartAction(item));
  };

  const handelRemoveFromQuantityInCartButton = () => {
    dispatch(MinFromCart(item));
  };

  const handleRemoveFromCart = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (userConfirmed) {
      dispatch(RemoveFromCartAction(item));
    } else {
      return;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <div
            className="bg-image hover-overlay hover-zoom ripple rounded"
            data-mdb-ripple-color="light"
          >
            <img src={item.Photos} className="w-100" />
            <a href="#!">
              <div
                className="mask"
                style={{
                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                }}
              ></div>
            </a>
          </div>
        </div>

        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
          <p>
            <strong>{item.Title}</strong>
          </p>

          <p className="ms-1">Size: {item["Property size:"]} M</p>

          <button
            onClick={handleRemoveFromCart}
            type="button"
            className="btn btn-danger btn-sm me-1 mb-2"
            data-mdb-toggle="tooltip"
            title="Remove item"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button
              className="btn btn-primary h-25 ms-1"
              onClick={handelRemoveFromQuantityInCartButton}
            >
              <i className="fas fa-minus"></i>
            </button>

            <div className="form-outline ms-3">
              <input
                onChange={quantityFieldChangeHandler}
                id="form1"
                min="0"
                name="quantity"
                value={item.quantity}
                type=""
                className="form-control w-75 ms-2"
              />
              <label className="form-label" htmlFor="form1">
                Quantity
              </label>
            </div>

            <button
              className="btn btn-primary h-75 me-5"
              onClick={handelAddToQuantityInCartButton}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <p className="text-start text-md-center">
            <strong>$ {item.Price} </strong>
          </p>
        </div>
      </div>

      <hr className="my-4" />
    </>
  );
};

export default CartItemComp;

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { AddToCartAction } from "../../store/actions/AddToCart";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import AddToCartModal from "./AddToCartModal";
import { AddToWishListAction } from "../../store/actions/AddToWishAction";
import { RemoveFromWishListAction } from "../../store/actions/RemoveFromWishAction";

const WishPageCard = (props) => {
  const dispatch = useDispatch();

  const wishListLocalInProductCard = useSelector(
    (state) => state.WishLIST.wishList
  );

  const [is_wish, setWish] = useState(false);
  const product = props.productObject;

  const checkISWished = () => {
    if (wishListLocalInProductCard.includes(product)) {
      setWish(true);
    } else {
      setWish(false);
    }
  };
  useEffect(() => {
    checkISWished();
  });

  const AddCartHandlerButton = () => {
    // if (isLogedIn) {
    dispatch(AddToCartAction(product));

    // } else {
    // alert("you must be logged in to add to cart");
    // }
  };

  const addToWishHandler = () => {
    dispatch(AddToWishListAction(product));
  };

  const removeFromWishHandler = () => {
    dispatch(RemoveFromWishListAction(product));
  };

  return (
    <>
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={{ border: "none" }}>
          <div className="row">
            <div className="offset-1 col-lg-6 col">
              <img
                src={product.Photos}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="offset-1 col-lg-4 ">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h5 className="card-title">{product.Title}</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="card-title">{product.Price} €</h5>
                  </div>
                </div>

                <p className="card-text pt-3">{product.Description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Last updated {product.Timestamp}
                  </small>
                </p>

                <div className="card-body d-flex justify-content-end">
                  <Link
                    to={`/${product.id}`}
                    className="card-link text-light btn btn-secondary"
                  >
                    More Details
                  </Link>
                  <a
                    onClick={AddCartHandlerButton}
                    className="card-link text-light btn "
                    style={{ backgroundColor: "chocolate" }}
                    data-bs-toggle="modal"
                    data-bs-target="#addToCartModal"
                  >
                    Add to Cart
                  </a>

                  {is_wish ? (
                    <>
                      <i
                        onClick={removeFromWishHandler}
                        className="fs-2 fa-solid fa-book-open ms-4"
                        style={{ color: "chocolate" }}
                      ></i>
                    </>
                  ) : (
                    <>
                      {" "}
                      <i
                        onClick={addToWishHandler}
                        className="fs-2 fa-sharp fa-solid fa-book-open  ms-4"
                      ></i>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal />
    </>
  );
};

export default WishPageCard;

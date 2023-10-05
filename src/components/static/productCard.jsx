import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { AddToCartAction } from "../../store/actions/AddToCart";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import AddToCartModal from "./AddToCartModal";
import { AddToWishListAction } from "../../store/actions/AddToWishAction";
import { RemoveFromWishListAction } from "../../store/actions/RemoveFromWishAction";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const localProduct = props.productObject;
  console.log(localProduct)

  const isLogedIn = useSelector((state) => state.IsLog.isLogedIn);
  const wishListLocalInProductCard = useSelector(
    (state) => state.WishLIST.wishList
  );
  const globalProductList = useSelector((state) => state.Products.productList);

  const [is_fav, setFav] = useState(false);
  const [is_wish, setWish] = useState(false);

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

  const checkIsWishedWhenMountAndUnMount = () => {
    // console.log("came From Is Wished Check");

    wishListLocalInProductCard.some((products) => {
      if (localProduct.id === products.id) {
        // console.log("found in wish List.");
        setWish(true);
      } else {
      }
    });
  };
  useEffect(() => {
    setWish(false);
    setFav(false)
    checkIsFavWhenMountAndUnMount();
    checkIsWishedWhenMountAndUnMount();
  }, [globalProductList]);

  const AddCartHandlerButton = () => {
    // if (isLogedIn) {
    dispatch(AddToCartAction(localProduct));

    // } else {
    // alert("you must be logged in to add to cart");
    // }
  };

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

  const AddToWishHandler = () => {
    setWish(true);
    dispatch(AddToWishListAction(localProduct));
  };

  const RemoveFromWishHandler = () => {
    setWish(false);
    dispatch(RemoveFromWishListAction(localProduct));
  };

  return (
    <>
      <div className="container mb-5 mt-5">
        <div className="card mb-3" style={{ border: "none" }}>
          <div className="row">
            <div className="offset-1 col-lg-6 col">
              <img
                src={localProduct.Photos}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="offset-1 col-lg-4 ">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h5 className="card-title">{localProduct.Title}</h5>
                  </div>
                  <div className="col-4">
                    <h5 className="card-title">{localProduct.Price} €</h5>
                  </div>
                </div>

                <p className="card-text pt-3">{localProduct.Description}</p>
                <h5 className="card-text pt-3">
                  Size : <strong>{localProduct["Property size:"]} M </strong>
                </h5>

                <p className="card-text">
                  <small className="text-muted">
                    Last updated {localProduct.Timestamp}
                  </small>
                </p>

                <div className="card-body d-flex justify-content-end">
                  <Link
                    to={`/${localProduct.id}`}
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
                  {is_fav ? (
                    <>
                      <a
                        onClick={addToFavHandler}
                        className="text-dark fs-3 ms-4 "
                      >
                        <i className="fa-solid fa-heart"></i>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={addToFavHandler}
                        className="text-dark fs-3 ms-4 "
                      >
                        <i className="fa-regular fa-heart"></i>
                      </a>
                    </>
                  )}

                  {is_wish ? (
                    <>
                      <i
                        onClick={RemoveFromWishHandler}
                        className="fs-2 fa-solid fa-book-open ms-4"
                        style={{ color: "chocolate" }}
                      ></i>
                    </>
                  ) : (
                    <>
                      {" "}
                      <i
                        onClick={AddToWishHandler}
                        className="fa-sharp fa-solid fa-book-open fs-2 ms-4"
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

export default ProductCard;

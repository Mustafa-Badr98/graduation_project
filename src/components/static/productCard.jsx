import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { AddToCartAction } from "../../store/actions/AddToCart";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import AddToCartModal from "./AddToCartModal";
const ProductCard = (props) => {
  const isLogedIn = useSelector((state) => state.IsLog.isLogedIn);
  const [is_fav, setFav] = useState(false);
  const product = props.productObject;
  console.log(product);
  const param = useParams();
  console.log(param);

  useEffect(() => {
    const sessionStorageKeys = Object.keys(sessionStorage);
    if (sessionStorageKeys.includes(product.id.toString())) {
      setFav(true);
    }
  }, [product.id]);

  const dispatch = useDispatch();
  const AddCartHandlerButton = () => {
    // if (isLogedIn) {
    dispatch(AddToCartAction(product));

    // } else {
    // alert("you must be logged in to add to cart");
    // }
  };

  const addToFavHandler = () => {
    if (is_fav) {
      dispatch(UpdateFavCountRemove(product));
      setFav(false);
    } else {
      dispatch(UpdateFavCountAdd(product));
      setFav(true);
    }
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

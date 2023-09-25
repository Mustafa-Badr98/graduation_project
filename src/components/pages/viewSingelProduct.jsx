import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "./viewSingleProductCSS.css";
import MyFooter from "../static/footer";
import { useDispatch } from "react-redux";
import { UpdateFavCountRemove } from "../../store/actions/FavCountRemoveAction";
import { UpdateFavCountAdd } from "../../store/actions/FavCountAddAction";
import { AddToCartAction } from "../../store/actions/AddToCart";
import AddToCartModal from "../static/AddToCartModal";
const ViewSingleProductPage = () => {
  const dispatch = useDispatch();
  const [is_fav, setFav] = useState(false);

  const addToFavHandler = () => {
    if (is_fav) {
      dispatch(UpdateFavCountRemove(product));
      setFav(false);
    } else {
      dispatch(UpdateFavCountAdd(product));
      setFav(true);
    }
  };
  const checkIsFav = (product) => {
    const sessionStorageKeys = Object.keys(sessionStorage);
    if (sessionStorageKeys.includes(product.id.toString())) {
      setFav(true);
    }
  };
  const AddCartHandlerButton = () => {
    // if (isLogedIn) {
    dispatch(AddToCartAction(product));

    // } else {
    // alert("you must be logged in to add to cart");
    // }
  };
  const param = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`https://api-generator.retool.com/lgHeOw/realtor_site/${param.id}`)
      .then((res) => {
        setProduct(res.data);
        checkIsFav(product);
        console.log(res);
        console.log(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product]);
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img src={product.Photos} />
                  </div>
                  <div className="tab-pane" id="pic-2">
                    <img src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-3">
                    <img src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-4">
                    <img src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-5">
                    <img src="http://placekitten.com/400/252" />
                  </div>
                </div>
                <ul className="preview-thumbnail nav nav-tabs">
                  <li className="active">
                    <a data-target="#pic-1" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-2" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-3" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-4" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a data-target="#pic-5" data-toggle="tab">
                      <img src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{product.Title}</h3>
                <div className="rating">
                  <div className="stars">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <span className="review-no">41 reviews</span>
                </div>
                <p className="product-description">{product.Description}</p>
                <h4 className="price">
                  current price: <span>{product.Price} €</span>
                </h4>
                <p className="vote">
                  <strong>91%</strong> of buyers enjoyed this product!{" "}
                  <strong>(87 votes)</strong>
                </p>
                <h5 className="sizes">
                  size:
                  <span className="ms-2" data-toggle="tooltip" title="By Metar">
                    {product["Property size:"]} M
                  </span>
                </h5>

                <div className="action">
                  <button
                    onClick={AddCartHandlerButton}
                    className="add-to-cart btn btn-default"
                    data-bs-toggle="modal"
                    data-bs-target="#addToCartModal"
                    type="button"
                  >
                    add to cart
                  </button>
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
      <AddToCartModal/>
      <MyFooter />
    </>
  );
};

export default ViewSingleProductPage;

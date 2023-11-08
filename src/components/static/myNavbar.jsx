import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { LoginAction } from "../../store/actions/loginAction";
import { LogoutAction } from "../../store/actions/logoutAction";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import axios from "axios";

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [userFavCount, setUserFavCount] = useState(0);
  const storedAuthToken = localStorage.getItem("authToken");
  console.log(user);
  console.log(isLoggedIn);

  // const WishCount = useSelector((state) => state.WishLIST.wishList.length);
  // const cartNumbers = useSelector((state) => state.CartList.cartList.length);

  const dispatch = useDispatch();
  dispatch(GetProductsListAction());

  // dispatch(GetProductsListAction());

  function logoutHandler() {
    const userConfirmed = window.confirm(
      "Are you sure you want to Logout ? we will miss you ):  "
    );

    if (userConfirmed) {
      axios
        .post("http://127.0.0.1:8000/api/user/logout",null,{
          withCredentials: true,

          headers: {
            Authorization: `Token ${storedAuthToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          // Handle successful logout, if needed
        })
        .catch((error) => {
          console.error(
            "Logout error:",
            error.response ? error.response.data : error.message
          );
          // Handle logout error, if needed
        });

      dispatch(LogoutAction());
    } else {
      return -1;
    }
  }
  // const dispatch = useDispatch();
  // dispatch(LoginAction(""));
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setIsLoggedIn(false);
      setUserFavCount(0);
      console.log("we entered the if statment");
    } else {
      console.log("we entered the else statment");

      setIsLoggedIn(true);
      setUserFavCount(user.favorites.length);
    }
    console.log(isLoggedIn);
  }, [user]);
  // console.log(isLoggedIn);
  return (
    <>
      <div className="container ">
        <nav
          id="nav"
          className="navbar navbar-expand-lg bg-body p-0 sticky-top"
        >
          <Link
            to="/"
            className="navbar-brand text-dark ms-4 mt-2"
            href="#home"
          >
            <h2>Realtor Project</h2>
          </Link>

          <button
            className="navbar-toggler ms-auto me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse d-lg-flex justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav mt-2 d-none d-lg-flex">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/Fav"
                      className="nav-link text-dark me-2"
                      href="#fav"
                    >
                      <i className="fa-solid fa-heart fs-5"></i>
                      <span
                        style={{
                          backgroundColor: "chocolate",
                          borderRadius: "20px",
                          width: "100px",
                        }}
                        className="fs-6 text-light ms-1 pe-2 ps-1"
                      >
                        {" "}
                        {userFavCount}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            <div className="float-start">
              <ul className="navbar-nav">
                {!isLoggedIn ? (
                  <>
                    <div className="d-flex flex-column flex-lg-row">
                      <li className="nav-item">
                        <span
                          data-bs-toggle="modal"
                          data-bs-target="#loginModal"
                          className="text-light fs-6 me-2 btn btn-dark"
                          style={{
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: "chocolate",
                          }}
                        >
                          LogIn
                        </span>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fs-6 me-2"
                          to="/register"
                        >
                          SignUp
                        </Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <>
                    <li className="mt-2 me-3">
                      <Link to="/userAds" className="dropdown-item">
                        My Ads
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link
                        to="/sellProduct"
                        className="btn btn-danger rounded-5 me-3 "
                      >
                        Sell
                      </Link>
                    </li>
                    <div className="dropdown me-4">
                      <button
                        style={{ borderRadius: "40px" }}
                        className="btn btn-dark "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {`${user["user_name"]}`}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to={`/EditUserProfile`}
                            className="dropdown-item"
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/userAds" className="dropdown-item">
                            My Ads
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            onClick={logoutHandler}
                            className="dropdown-item"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-end me-5  d-lg-flex">
            <a href="https://www.facebook.com/">
              <i className="fab fa-facebook text-dark pe-2"></i>
            </a>
            <a href="https://twitter.com/?lang=en">
              <i className="fab fa-twitter text-dark pe-2"></i>
            </a>
            <a href="https://www.linkedin.com/in/mustafa-badr-iti/">
              <i className="fab fa-linkedin text-dark"></i>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MyNavbar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { LoginAction } from "../../store/actions/loginAction";
import { LogoutAction } from "../../store/actions/logoutAction";

const MyNavbar = () => {
  const isLogedIn = useSelector((state) => state.IsLog.isLogedIn);
  const cartNumbers = useSelector((state) => state.CartList.cartList.length);
  const userName = useSelector((state) => state.currentUSER.currentUser);
  const FavCount = useSelector((state) => state.FavCOUNT.favCount);

  const [userFirstChar, setUser] = useState(userName[0]);

  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(LogoutAction());
  }
  // const dispatch = useDispatch();
  // dispatch(LoginAction(""));
  useEffect(() => {
    setUser(userName[0]);
  }, [isLogedIn]);
  console.log(isLogedIn);
  return (
    <>
      <div className="container ">
        <nav id="nav" className="navbar navbar-expand-lg bg-body p-0">
          <Link
            to="/"
            className="navbar-brand text-dark ms-4 mt-2"
            href="#home"
          >
            <h2>E-Commerce</h2>
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/Fav"
                  className="nav-link text-dark me-2"
                  href="#contact"
                >
                  Favorites
                  <span
                    style={{
                      backgroundColor: "chocolate",
                      borderRadius: "20px",
                      width: "100px",
                    }}
                    className="fs-6 text-light ms-1 pe-2 ps-1"
                  >
                    {" "}
                    {FavCount}
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark " to="/cart">
                  <i className="fs-5 fa-solid text-dark fa-cart-shopping "></i>
                  <span
                    style={{
                      backgroundColor: "chocolate",
                      borderRadius: "20px",
                      width: "100px",
                    }}
                    className="fs-6 text-light ms-1 pe-2 ps-2"
                  >
                    {cartNumbers}
                  </span>
                </Link>
              </li>
            </ul>

            <div className="float-end">
              <ul className="navbar-nav">
                {!isLogedIn ? (
                  <>
                    <li className="nav-item">
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="text-light fs-6 me-2 btn btn-dark"
                        style={{ borderRadius: "20px" ,border:"none",backgroundColor:"chocolate"}}
                      >
                        LogIn
                      </span>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-dark fs-6  me-2"
                        to="/register"
                      >
                        SignUp
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="dropdown me-4">
                      <button
                        style={{ borderRadius: "40px" }}
                        className="btn btn-dark "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {`${userFirstChar}`}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <span
                            onClick={logoutHandler}
                            className="dropdown-item"
                          >
                            Logout
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-end me-5">
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { LoginAction } from "../../store/actions/loginAction";
import { LogoutAction } from "../../store/actions/logoutAction";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import axios from "axios";
import brandPic from "../../assets/images/6883103.jpg";
import ConfirmationModal from "./confirmModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const MyNavbar = () => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    axios
      .post("http://127.0.0.1:8000/api/user/logout", null, {
        withCredentials: true,

        headers: {
          Authorization: `Token ${storedAuthToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Logout error:",
          error.response ? error.response.data : error.message
        );
      });

    dispatch(LogoutAction());

    setShowModal(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [userFavCount, setUserFavCount] = useState(0);
  const storedAuthToken = localStorage.getItem("authToken");
  // console.log(user);
  // console.log(isLoggedIn);

  const dispatch = useDispatch();
  dispatch(GetProductsListAction());

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      setIsLoggedIn(false);
      setUserFavCount(0);
      // console.log("we entered the if statment");
    } else {
      // console.log("we entered the else statment");

      setIsLoggedIn(true);
      setUserFavCount(user.favorites.length);
    }
  }, [user]);

  return (
    <>
      <div className="container ">
        <nav id="nav" className="navbar navbar-expand-lg bg-body p-0">
          <Link to="/" className="navbar-brand text-dark" href="#home">
            <img
              className="pe-5"
              style={{ width: "300px", height: "70px" }}
              src={brandPic}
              alt=""
              srcSet=""
            />
          </Link>

          {user.is_admin ? (
            <>
              <Link to="/admin_panel" className="text-light rounded-5">
                <i
                  className="fa-solid fa-toolbox fs-4"
                  style={{ color: "#f82a2a" }}
                ></i>
              </Link>
            </>
          ) : (
            <></>
          )}
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
            <ul className="navbar-nav mt-2 d-none d-lg-flex"></ul>

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
                          {t("Login")}
                        </span>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fs-6 me-2"
                          to="/register"
                        >
                          {t("Register")}
                        </Link>
                      </li>
                    </div>
                    <i className="fa-solid fa-earth-americas mt-2 me-1 fs-4"></i>
                    <LanguageSwitcher />
                  </>
                ) : (
                  <>
                    <li className="nav-item ">
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/sellProduct"
                        className="btn btn-danger text-light rounded-5 me-3 "
                      >
                        {t("Sell Your Property")}
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
                        {user.user_name}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            to={`/EditUserProfile/${user.id}`}
                            className="dropdown-item"
                          >
                            <i className="fa-solid fa-user me-2"></i>{t("My Profile")} 
                          </Link>
                        </li>
                        <li>
                          <Link to="/userAds" className="dropdown-item">
                            <i className="fa-solid fa-house me-2"></i> {t("My Ads")}
                          </Link>
                        </li>
                        <li>
                          <Link to="/MyDeals" className="dropdown-item">
                            <i className="fa-solid fa-handshake-simple me-2"></i>{" "}
                            
                            {t("My Deals")}
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/Fav"
                            className="dropdown-item text-dark me-2"
                          >
                            <i className="fa-solid fa-heart fs-5 me-2"></i>
                            
                            {t("Favorites")}
                            <span
                              style={{
                                backgroundColor: "rgb(232, 46, 47)",
                                borderRadius: "20px",
                                width: "80px",
                              }}
                              className="fs-6 text-light ms-1 pe-2 ps-1"
                            >
                              {" "}
                              {userFavCount}
                            </span>
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item"
                          >
                            <i className="fa-solid fa-right-from-bracket me-2 ms-1"></i>
                            
                            {t("Logout")}
                          </button>
                        </li>
                      </ul>
                    </div>
                    <i className="fa-solid fa-earth-americas mt-2 me-1 fs-4"></i>
                    <LanguageSwitcher />
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleConfirmLogout}
        body={"Are you sure you want to Logout ? we will miss you ):  "}
      />
    </>
  );
};

export default MyNavbar;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyAlert from "../static/alert";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../store/actions/loginAction";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import axios from "axios";
import { StoreToken } from "../../store/actions/StoreToken";
import MessageModal from "../static/messageModal";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const SignupPage = () => {
  const user = useSelector((state) => state.currentUSER.currentUser);

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState(
    "SignUp Complete. and you are now logged in."
  );
  const handleShowMessage = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const egyptGovernorates = [
    "Alexandria",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matrouh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
  ];

  const dispatch = useDispatch();
  const history = useHistory();
  const [hasErrors, setHasError] = useState(true);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    mobile: "",
    password: "",
    location: "Egypt",
  });

  const [errors, setErrors] = useState({
    usernameError: "*",
    emailError: "*",
    phoneError: "*",
    passwordError: "*",
    rePasswordError: "*",
  });

  const checkHasError = () => {
    const x = Object.values(errors).some((error) => error !== "");
    setHasError(x);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "username") {
      setFormData({
        ...formData,
        user_name: e.target.value,
      });
      setErrors({
        ...errors,
        usernameError:
          e.target.value.length === 0 ? "this field is required" : "",
      });
    } else if (e.target.name === "email") {
      setFormData({
        ...formData,
        email: e.target.value,
      });
      setErrors({
        ...errors,
        emailError:
          e.target.value.length === 0
            ? "This field is required"
            : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
            ? "Not a valid email format"
            : "",
      });
    } else if (e.target.name === "password") {
      setFormData({
        ...formData,
        password: e.target.value,
      });
      setErrors({
        ...errors,
        passwordError:
          e.target.value.length === 0
            ? "this field is required"
            : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(
                e.target.value
              )
            ? "Bad Password must be 8 characters 1 Lower and 1 Upper and 1 digit and a special"
            : "",
      });
    } else if (e.target.name === "rePassword") {
      setFormData({
        ...formData,
        rePassword: e.target.value,
      });
      setErrors({
        ...errors,
        rePasswordError:
          e.target.value.length === 0
            ? "this field is required"
            : !(e.target.value === formData.password)
            ? "does not match"
            : "",
      });
    } else if (e.target.name === "governorate") {
      setFormData({
        ...formData,
        location: e.target.value,
      });
      console.log(formData);
    } else if (e.target.name === "phone") {
      setFormData({
        ...formData,
        mobile: e.target.value,
      });
      setErrors({
        ...errors,
        phoneError:
          e.target.value.length === 0
            ? "this field is required"
            : !/^(010|011|012|015)\d{8}$/.test(e.target.value)
            ? "must be 11 digit and be an egyptian number"
            : "",
      });
      console.log(formData);
    }
  };

  const handelSubmitButton = () => {
    if (!hasErrors) {
      var jsonUser = JSON.stringify(formData);
      let data_send = {
        email: formData.email,
        user_name: formData.user_name,
        mobile_phone: formData.mobile,
        password: formData.password,
        location: formData.location,
      };
      console.log(formData);
      console.log(data_send);

      axios
        .post("http://127.0.0.1:8000/api/user/register", data_send)
        .then(async (res) => {
          console.log(res.data.user);
          const loginData = {
            email: formData.email,
            password: formData.password,
          };
          axios
            .post("http://127.0.0.1:8000/api/user/login", loginData)
            .then((response) => {
              const authToken = response.data.token;
              localStorage.setItem("authToken", authToken);
              dispatch(StoreToken(authToken));
              console.log(authToken);
              dispatch(LoginAction());
              dispatch(GetCurrentUserAction(authToken));
            });
          await handleShowMessage();

          await new Promise((resolve) => setTimeout(resolve, 5000));

          await history.push("/");

          // alert(
          //   "SignUp Complete. You will now be redirected to the home page."
          // );
        })
        .catch((e) => {
          alert("your email is already registered");
          console.log(e.response.data);
        });
    }
  };

  useEffect(() => {
    checkHasError();
  }, [formData]);
  return (
    <>
      {Object.keys(user).length > 0 && <Redirect to="/" />}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        {t("Sign up")}
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <span
                              className="ms-2"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {errors.usernameError}
                            </span>
                            <input
                              value={formData.username}
                              onChange={handleInputChange}
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="username"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              {t("Your Name")}
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <span
                              className="ms-2"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {errors.emailError}
                            </span>
                            <input
                              value={formData.email}
                              onChange={handleInputChange}
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              {t("Your Email")}
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <span
                              className="ms-2"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {errors.passwordError}
                            </span>
                            <input
                              value={formData.password}
                              onChange={handleInputChange}
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              {t("Password")}
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <span
                              className="ms-2"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {errors.rePasswordError}
                            </span>
                            <input
                              value={formData.rePassword}
                              onChange={handleInputChange}
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="rePassword"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              {t("Repeat your password")}
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <div style={{ height: "9rem" }} className=""></div>
                      <div className="mb-4 pb-2 ">
                        <div className="row">
                          <div className="col-4">
                            <div className="row">
                              <div className="col-3 mt-1">
                                <i className="fa-solid fa-globe fa-lg fs-5 me-3 fa-fw"></i>
                              </div>
                              <div className="col-9">
                                <select
                                  onChange={handleInputChange}
                                  style={{ height: "2rem", width: "15rem" }}
                                  className="pt-1"
                                  id="governorate"
                                  name="governorate"
                                >
                                  {egyptGovernorates.map(
                                    (governorate, index) => {
                                      return (
                                        <option key={index} value={governorate}>
                                          {" "}
                                          {t(governorate)}{" "}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-9 ms-2">
                            {" "}
                            <label className="ms-4" htmlFor="state">
                              {t("Governorate")}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <span
                            className="ms-2"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            {errors.phoneError}
                          </span>
                          <input
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="text"
                            id="form3Example3c"
                            className="form-control"
                            name="phone"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            {t("Your Phone")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      onClick={handelSubmitButton}
                      disabled={hasErrors}
                      // data-bs-toggle="modal"
                      // data-bs-target="#submitModal"
                      type="button"
                      className="btn btn-primary btn-lg"
                    >
                      {t("Register")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MyAlert
        title={`welcome ${formData.username} `}
        description="i Hope you enjoy our website to the fullest "
      />
      <MessageModal
        show={showModal}
        onHide={handleCloseModal}
        body={modalBody}
      />
    </>
  );
};

export default SignupPage;

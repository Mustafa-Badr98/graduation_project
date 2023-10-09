import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyAlert from "../static/alert";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/loginAction";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
const SignupPage = () => {
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
    username: "",
    email: "",
    phone: "",
    governorate: "",
    city: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "*",
    emailError: "*",
    phoneError: "*",
    cityError: "*",
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
        username: e.target.value,
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
        governorate: e.target.value,
      });
      console.log(formData);
    } else if (e.target.name === "city") {
      setFormData({
        ...formData,
        city: e.target.value,
      });
      setErrors({
        ...errors,
        cityError: e.target.value.length === 0 ? "this field is required" : "",
      });
      console.log(formData);
    } else if (e.target.name === "phone") {
      setFormData({
        ...formData,
        phone: e.target.value,
      });
      setErrors({
        ...errors,
        phoneError:
          e.target.value.length === 0
            ? "this field is required"
            : !/^(010|011|012|015)\d{8}$/.test(e.target.value)
            ? "must be 11 number"
            : "",
      });
      console.log(formData);
    }
  };

  const handelSubmitButton = () => {
    if (!hasErrors) {
      var jsonUser = JSON.stringify(formData);
      localStorage.setItem(formData.email, jsonUser);
      dispatch(LoginAction(formData));
      dispatch(GetCurrentUserAction(formData));
      alert("SignUp Complete You will now be redirect to the home page.");
      history.push("/");
    }
  };

  useEffect(() => {
    checkHasError();
  }, [formData]);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
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
                              Your Name
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
                              Your Email
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
                              Password
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
                              Repeat your password
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <div style={{ height: "9rem" }} className=""></div>
                      <div className="mb-5 pb-2">
                        <i class="fa-solid fa-globe fa-lg me-3 fa-fw"></i>
                        <label className="fs-4" htmlFor="state">
                          Governorate
                        </label>

                        <select
                          onChange={handleInputChange}
                          style={{ height: "2rem", width: "15.6rem" }}
                          className="ms-2 ms-4"
                          id="governorate"
                          name="governorate"
                        >
                          {egyptGovernorates.map((governorate, index) => {
                            return (
                              <option key={index} value={governorate}>
                                {" "}
                                {governorate}{" "}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i class="fa-solid fa-city fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <span
                            className="ms-2"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            {errors.cityError}
                          </span>
                          <input
                            onChange={handleInputChange}
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            value={formData.city}
                          />
                          <label className="form-label" htmlFor="city">
                            Your City
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i class="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
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
                            Your Phone
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
                      Register
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
    </>
  );
};

export default SignupPage;

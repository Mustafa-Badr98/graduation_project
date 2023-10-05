import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyAlert from "./alert";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../store/actions/loginAction";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
const SignupPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasErrors, setHasError] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "*",
    emailError: "*",
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
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
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
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
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

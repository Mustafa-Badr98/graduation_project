import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import { LoginAction } from "../../store/actions/loginAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { StoreToken } from "../../store/actions/StoreToken";
import MessageModal from "./messageModal";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const LoginModal = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const closeButton = document.getElementById("closeButton");

  const handleShowModalMessage = () => {
    setShowMessageModal(true);
  };

  const handleCloseModalMessage = () => {
    setShowMessageModal(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  // const isLogged = useSelector((state) => state.IsLog.isLogedIn);

  const [hasErrors, setHasError] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleInputChange = (e) => {
    let x = Object.values(errors).some((error) => error !== "");
    setHasError(x);
    console.log(e.target.name);
    if (e.target.name === "username") {
      setFormData({
        ...formData,
        email: e.target.value,
      });

      setErrors({
        ...errors,
        emailError:
          e.target.value.length === 0
            ? "this field is required"
            : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
            ? "not a valid email format"
            : "",
      });
    } else {
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
            ? "must be 8 chars 1 Lower,1 Upper,1 digit,1 special"
            : "",
      });
    }
    console.log(formData);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();

    if (!hasErrors) {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      client
        .post("/api/user/login", loginData)
        .then(async (response) => {
          const authToken = response.data.token;
          localStorage.setItem("authToken", authToken);
          dispatch(StoreToken(authToken));
          console.log(authToken);
          dispatch(LoginAction());
          dispatch(GetCurrentUserAction(authToken));

          if (closeButton) {
            closeButton.click();
          }
          
          // setMessageBody("Login Complete.");
          // handleShowModalMessage();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data.detail : error.message
          );
          setMessageBody("Did you forget your password or email ? .");
          handleShowModalMessage();
        });
    } else {
      alert("did you forget your email ?");
    }
    // console.log("Login clicked:", formData);
  };
  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 ms-auto" id="exampleModalLabel">
                Login
              </h1>
              <button
                id="closeButton"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <p className="ms-4 fw-bold fs-5">Welcome to our Realtor Site.</p>
              <p className="fs-6">
                Please Login First to Enjoy the Experiences.
              </p>
              <form>
                <div className="form-group mt-4">
                  <label htmlFor="username">Username</label>
                  <input
                    value={formData.username}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    name="username"
                  />
                  <span
                    className="mt-1"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errors.emailError}
                  </span>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">Password</label>
                  <input
                    value={formData.password}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                  />
                  <span
                    className="mt-1"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errors.passwordError}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    handleSubmitButton(e);
                  }}
                  className="btn btn-primary mt-4"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <MessageModal
        show={showMessageModal}
        onHide={handleCloseModalMessage}
        body={messageBody}
      />
    </>
  );
};

export default LoginModal;

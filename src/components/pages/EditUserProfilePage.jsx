import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import MyFooter from "../static/footer";
import axios from "axios";
import { RefreshUserDataAction } from "../../store/actions/RefreshUserData";
import { LogoutAction } from "../../store/actions/logoutAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import no_profile_pic from "../../assets/images/no-profile.jpg";
import ConfirmationModal from "../static/confirmModal";
import MessageModal from "../static/messageModal";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditProfilePage = () => {
  const param = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModalMessage = () => {
    setShowMessageModal(true);
  };

  const handleCloseModalMessage = () => {
    setShowMessageModal(false);
  };

  const handleDeleteAccountModal = (id) => {
    handleCloseModal();

    const response = axios
      .delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Token ${storedAuthToken}`,
        },
      })
      .then((res) => console.log(res))
      .then(() => {
        setMessageBody("Your Account has been deleted.");
        handleShowModalMessage();
      })

      .then(() => dispatch(LogoutAction()));
    // .then(() => {
    //   setTimeout(() => {}, [5000]);
    // })
    // .then(() => history.push("/"));
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.IsLog.isLogedIn);
  // const userInSession = useSelector((state) => state.currentUSER.currentUser);
  const [userInSession, setUser] = useState({});
  const storedAuthToken = localStorage.getItem("authToken");

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

  const [hasErrors, setHasError] = useState(true);

  const checkHasError = () => {
    const x = Object.values(errors).some((error) => error !== "");
    setHasError(x);
  };

  const [formData, setFormData] = useState({
    username: "",
    governorate: "cairo",
    email: "",
    photo: [],
    phone: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "*",
    emailError: "*",
    phoneError: "*",
    photoErrors: "Must upload a photo.",
    passwordError: "*",
    rePasswordError: "*",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      photo: [file],
    });
    console.log(formData.photo);
    setErrors({ photoErrors: "" });
  };

  const clearSelectedImage = () => {
    setFormData({ photo: [] });
    setErrors({ photoErrors: "Must Upload a photo" });

    console.log(formData.photo);
    const fileInput = document.getElementById("photo");
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
    // /////////////////////////////////////////////

    if (e.target.name === "username") {
      setErrors({
        ...errors,
        usernameError:
          e.target.value.length === 0 ? "this field is required" : "",
      });
    } else if (e.target.name === "email") {
      setErrors({
        ...errors,
        emailError:
          e.target.value.length === 0
            ? "This field is required"
            : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
            ? "Not a valid email format"
            : e.target.value === userInSession.email
            ? "you must change your email"
            : "",
      });
    } else if (e.target.name === "password") {
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
      setErrors({
        ...errors,
        rePasswordError:
          e.target.value.length === 0
            ? "this field is required"
            : !(e.target.value === formData.password)
            ? "password does not match"
            : "",
      });
    } else if (e.target.name === "phone") {
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
      console.log(errors);
    }
  };

  const handleSaveChanges = () => {
    if (!hasErrors && Object.keys(userInSession).length > 0) {
      const data = new FormData();

      data.append("user_name", formData.username);
      data.append("email", formData.email);
      data.append("mobile_phone", formData.phone);
      data.append("location", formData.governorate);
      data.append("password", formData.password);
      data.append("profile_pic", formData.photo[0]);

      for (var key of data.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      try {
        const response = axios
          .put("http://127.0.0.1:8000/api/user/edit", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${storedAuthToken}`,
            },
          })

          .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
      } catch (error) {
        console.error("Error:", error);
      }

      // dispatch(GetCurrentUserAction(storedAuthToken));

      // dispatch(GetCurrentUserAction(modUser));

      console.log("Saving changes:", formData);
      setMessageBody("Changes has been saved.");
      handleShowModalMessage();
      // alert("changes has been saved");
    } else {
      setMessageBody("Please check all the fields.");
      handleShowModalMessage();
      // alert("please check all the fields");
    }
  };

  // const handleDeleteAccount = () => {
  //   try {
  //     const userConfirmed = window.confirm(
  //       "Are you sure you want to delete your Account? You will not be able to retrieve it afterward."
  //     );
  //     if (userConfirmed) {
  //       console.log(storedAuthToken);
  //       const response = axios
  //         .delete("http://127.0.0.1:8000/api/user/delete", {
  //           headers: {
  //             Authorization: `Token ${storedAuthToken}`,
  //           },
  //         })
  //         .then((res) => console.log(res))
  //         .then(() => alert("your account has been deleted. logout complete"))
  //         .then(() => dispatch(LogoutAction()))
  //         .then(() => history.push("/"));

  //       // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
  //     } else {
  //       console.log("Deletion canceled");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const get_user_data = () => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/user/id/${param.id}`)
        .then((res) => {
          console.log(res.data.data)
          setUser(res.data.data)
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };
  useEffect(() => {
    checkHasError();
    get_user_data();
  }, [formData]);
  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="container-xl px-4 pt-5 mt-4"
      >
        <nav className="nav nav-borders"></nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {formData.photo.length > 0 ? (
                  <>
                    <img
                      src={URL.createObjectURL(formData.photo[0])}
                      alt="Selected Image"
                      style={{ maxWidth: "14rem", maxHeight: "10rem" }}
                      className="mb-4"
                    />
                  </>
                ) : userInSession.profile_pic ? (
                  <>
                    {" "}
                    <img
                      style={{ height: "18rem", width: "18rem" }}
                      className="img-account-profile rounded-circle mb-2"
                      src={`http://localhost:8000${userInSession.profile_pic}`}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <img
                      style={{ height: "18rem", width: "18rem" }}
                      className="img-account-profile rounded-circle mb-2"
                      src={no_profile_pic}
                      alt=""
                    />
                  </>
                )}

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <span className="text-danger">{errors.photoErrors}</span>
                <input
                  type="file"
                  className={`form-control `}
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={clearSelectedImage}
                  className="btn btn-danger fs-6 mt-3"
                >
                  Clear Image
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3 username">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username (how your name will appear to other users on the
                      site)
                    </label>
                    <span
                      className="ms-2"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.usernameError}
                    </span>
                    <input
                      className="form-control w-75"
                      id="username"
                      name="username"
                      type="text"
                      placeholder={userInSession.user_name}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="governorate pb-4">
                    <div className="row">
                      <label className="small pb-1" htmlFor="state">
                        Governorate
                      </label>
                    </div>
                    <div className="row">
                      <select
                        defaultValue={userInSession.governorate}
                        onChange={handleChange}
                        style={{ height: "", width: "73%" }}
                        className="ms-2 form-control "
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
                  </div>

                  {/* Form Group (email address) */}
                  <div className="email mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <span
                      className="ms-2"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.emailError}
                    </span>
                    <input
                      className="form-control w-75"
                      id="email"
                      name="email"
                      type="email"
                      placeholder={userInSession.email}
                      value={formData.emailAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="phone-number ">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <span
                        className="ms-2"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {errors.phoneError}
                      </span>
                      <input
                        className="form-control w-75"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={userInSession.mobile_phone}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className=" password">
                      <label className="small mb-1" htmlFor="inputPassword">
                        Password
                      </label>
                      <span
                        className="ms-2"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {errors.passwordError}
                      </span>
                      <input
                        className="form-control w-75"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your New Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="">
                      <label className="small mb-1" htmlFor="rePassword">
                        Re Password
                      </label>
                      <span
                        className="ms-2"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {errors.rePasswordError}
                      </span>
                      <input
                        className="form-control w-75"
                        id="rePassword"
                        name="rePassword"
                        type="password"
                        placeholder="ReType your New Password"
                        value={formData.rePassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Save changes button */}
                  <div className="mt-5">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleSaveChanges}
                      disabled={
                        hasErrors || Object.keys(userInSession).length === 0
                      }
                    >
                      Save changes
                    </button>
                    <button
                      className="btn btn-danger ms-5"
                      type="button"
                      onClick={handleShowModal}
                      disabled={Object.keys(userInSession).length === 0}
                    >
                      Delete Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={() => handleDeleteAccountModal(userInSession.id)}
        body={"Are you sure you want to Delete Your Account ?"}
      />
      <MessageModal
        show={showMessageModal}
        onHide={handleCloseModalMessage}
        body={messageBody}
      />
    </>
  );
};

export default EditProfilePage;

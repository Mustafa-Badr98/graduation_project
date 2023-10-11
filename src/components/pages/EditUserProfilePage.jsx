import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import MyFooter from "../static/footer";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.IsLog.isLogedIn);
  const userInSession = useSelector((state) => state.currentUSER.currentUser);
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
    governorate: "",
    city: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "*",
    emailError: "*",
    phoneError: "*",
    cityError: "*",
    passwordError: "*",
  });

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
    } else if (e.target.name === "city") {
      setErrors({
        ...errors,
        cityError: e.target.value.length === 0 ? "this field is required" : "",
      });
      console.log(formData);
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
    }
  };

  const handleSaveChanges = () => {
    if (!hasErrors) {
      if (isLoggedIn) {
        const modUser = {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          governorate: formData.governorate,
          city: formData.city,
          password: formData.password,
          rePassword: formData.password,
        };

        const stringedUser = JSON.stringify(modUser);
        localStorage.removeItem(userInSession.email);
        localStorage.setItem(modUser.email, stringedUser);
        dispatch(GetCurrentUserAction(modUser));

        console.log("Saving changes:", formData);
        alert("changes has been saved");
      } else {
        alert("please login first ");
      }
    } else {
      alert("please check all the fields");
    }
  };

  useEffect(() => {
    checkHasError();
  }, [formData]);
  return (
    <>
      <div className="container-xl px-4 pt-5 mt-4 vh-100">
        <nav className="nav nav-borders"></nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  style={{ height: "18.6rem" }}
                  className="img-account-profile rounded-circle mb-2"
                  src="http://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                />

                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>

                <button className="btn btn-primary" type="button">
                  Upload new image
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
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
                      className="form-control"
                      id="username"
                      name="username"
                      type="text"
                      placeholder={userInSession.username}
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label className="fs-6 my-2" htmlFor="state">
                      Governorate
                    </label>

                    <select
                      defaultValue={userInSession.governorate}
                      onChange={handleChange}
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
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLocation">
                      City
                    </label>
                    <span
                      className="ms-2"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {errors.cityError}
                    </span>
                    <input
                      className="form-control"
                      id="city"
                      name="city"
                      type="text"
                      placeholder={userInSession.city}
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Form Group (email address) */}
                  <div className="mb-3">
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
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      placeholder={userInSession.email}
                      value={formData.emailAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
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
                        className="form-control"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={userInSession.phone}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
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
                        className="form-control"
                        id="password"
                        name="password"
                        type="text"
                        placeholder="Enter your New Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Save changes button */}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default EditProfilePage;
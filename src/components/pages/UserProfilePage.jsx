import React, { useState } from "react";

const ProfilePage = () => {
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

  const [formData, setFormData] = useState({
    username: "",
    governorate: "",
    city: "",
    emailAddress: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  const handleSaveChanges = () => {
    // Handle the logic to save changes (e.g., make an API call)
    console.log("Saving changes:", formData);
  };

  return (
    <div className="container-xl px-4 mt-4">
      {/* Account page navigation */}
      <nav className="nav nav-borders"></nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        {/* Profile picture card */}
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* Profile picture image */}
              <img
              style={{height:"18.2rem"}}
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              {/* Profile picture help block */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* Profile picture upload button */}
              <button className="btn btn-primary" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        {/* Account details card */}
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
                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="fs-6 my-2" htmlFor="state">
                    Governorate
                  </label>

                  <select
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
                  <input
                    className="form-control"
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                {/* Form Group (email address) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="emailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.emailAddress}
                    onChange={handleChange}
                  />
                </div>
                {/* Form Row */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (phone number) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Form Group (birthday) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPassword">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      type="text"
                      name="password"
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
  );
};

export default ProfilePage;

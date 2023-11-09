import React, { useEffect, useState } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { AddToUserProductListAction } from "../../store/actions/AddToUserProductList";
import { AddToProductListAction } from "../../store/actions/AddToProductList";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { GetProductsListAction } from "../../store/actions/GetProductsList";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function EditPropertyPage() {
  const [productToEdit, setProductToEdit] = useState({});

  const params = useParams();

  const [formData, setFormData] = useState({
    adName: "",
    governorate: "",
    type: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    photos: [],
    otherInfo: "",
  });

  useEffect(() => {
    if (Object.keys(productToEdit).length === 0) {
      client
        .get(`http://127.0.0.1:8000/api/properties/${params.id}`)
        .then((res) => setProductToEdit(res.data.data));
    } else {
    }
    setFormData({
      adName: productToEdit.title,
      governorate: productToEdit.location,
      type: productToEdit.type,
      area: productToEdit.area_size,
      bedrooms: productToEdit.number_of_bedrooms,
      bathrooms: productToEdit.number_of_bathrooms,
      price: productToEdit.price,
      photos: [],
      otherInfo: productToEdit.description,
    });
  }, [productToEdit]);

  console.log(productToEdit);
  console.log(formData);

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

  const history = useHistory();
  let locationLat = 0;
  let locationLon = 0;

  const isLoggedIn = useSelector((state) => state.IsLog.isLogedIn);
  const currentUser = useSelector((state) => state.currentUSER.currentUser);
  const token = useSelector((state) => state.TokenStore.token);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.photos.length + files.length > 5) {
      alert("You can upload a maximum of 5 photos.");
      return;
    }

    setFormData({
      ...formData,
      photos: [...formData.photos, ...files],
    });
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.adName.trim()) {
      validationErrors.adName = "Advertisement name is required.";
    }

    if (!formData.governorate.trim()) {
      validationErrors.governorate = "Governorate is required.";
    }

    if (!formData.bedrooms) {
      validationErrors.bedrooms = "Number of rooms is required.";
    } else if (isNaN(Number(formData.bedrooms))) {
      validationErrors.bedrooms = "Number of rooms must be a number.";
    }
    if (!formData.bathrooms) {
      validationErrors.bathrooms = "Number of rooms is required.";
    } else if (isNaN(Number(formData.bathrooms))) {
      validationErrors.bathrooms = "Number of rooms must be a number.";
    }

    if (!formData.price) {
      validationErrors.price = "Price is required.";
    } else if (isNaN(Number(formData.price))) {
      validationErrors.price = "Price must be a number.";
    }

    if (formData.photos.length < 3) {
      validationErrors.photos = "Must upload at least 3 images.";
    }

    setErrors(validationErrors);
    console.log(errors);

    if (Object.keys(validationErrors).length === 0) {
      // getLatLan(formData.city);

      const data = new FormData();

      data.append("title", formData.adName);
      data.append("description", formData.otherInfo);
      data.append("area_size", parseFloat(formData.area));
      data.append("location", formData.governorate);
      data.append("number_of_bathrooms", formData.bathrooms);
      data.append("number_of_bedrooms", formData.bedrooms);
      data.append("price", parseFloat(formData.price));
      data.append("lat", locationLat);
      data.append("lon", locationLon);
      data.append("type", formData.type);

      // Append each image individually
      for (let i = 0; i < formData.photos.length; i++) {
        data.append(`images`, formData.photos[i]);
      }

      for (var key of data.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      try {
        const response = await client
          .put(`/api/properties/${productToEdit.id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => console.log("Response:", res.data.property));
      } catch (error) {
        console.error("Error:", error);
      }

      dispatch(GetProductsListAction());

      alert("your product has been Edited");
      // history.push("/");
    } else {
      alert("please check all req fields");
    }
  };

  return (
    <>
      {formData.governorate != "" ? (
        <>
          <div className="container mt-5 mb-5">
            <div className="col-lg-10 ">
              <h1 className="text-secondary text-center mb-4">Edit Your AD</h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="adName" className="form-label">
                    AD Title:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.adName && "is-invalid"}`}
                    id="adName"
                    name="adName"
                    value={formData.adName}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger ">{errors.adName}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="governorate" className="form-label">
                    Governorate:
                  </label>
                  <select
                    name="governorate"
                    className="form-select "
                    aria-label="Default select example"
                    value={formData.governorate}
                    onChange={handleChange}
                  >
                    <option selected value="">
                      All Egypt
                    </option>
                    {egyptGovernorates.map((governorate, index) => {
                      return (
                        <option name="location" key={index} value={governorate}>
                          {" "}
                          {governorate}{" "}
                        </option>
                      );
                    })}
                  </select>
                  {errors.governorate && (
                    <div className="invalid-feedback">{errors.governorate}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type:
                  </label>
                  <select
                    className={`form-select ${errors.type && "is-invalid"}`}
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="sell">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="area" className="form-label">
                    Area (m²):
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.area && "is-invalid"}`}
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger ">{errors.area}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="rooms" className="form-label">
                    Number of bedrooms:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.bedrooms && "is-invalid"
                    }`}
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger ">{errors.bedrooms}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="rooms" className="form-label">
                    Number of bathrooms:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.bathrooms && "is-invalid"
                    }`}
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                  />
                  <span className="text-danger ">{errors.bathrooms}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Set Price:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.price && "is-invalid"}`}
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <span className="text-danger ">{errors.price}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">
                    Upload Photos (up to 5):
                  </label>
                  <span className="text-danger ms-4">{errors.photos}</span>
                  <input
                    type="file"
                    className={`form-control`}
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  {formData.photos.length > 0 && (
                    <div
                      style={{ position: "relative" }}
                      className="container-fluid mt-3 border"
                    >
                      <h5>Selected Photos:</h5>
                      <div
                        style={{
                          display: "inline-block",
                          textAlign: "center",
                        }}
                      >
                        {formData.photos.map((photo, index) => (
                          <>
                            <span key={index} className="ms-5">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Selected Photo ${index + 1}`}
                                style={{
                                  maxWidth: "14rem",
                                  maxHeight: "10rem",
                                }}
                                className="mb-4"
                              />
                              <span
                                type="button"
                                className="btn btn-danger fs-6 "
                                onClick={() => removePhoto(index)}
                              >
                                Remove
                              </span>
                            </span>
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.photo && (
                    <div className="invalid-feedback">{errors.photo}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="otherInfo" className="form-label">
                    Other Information:
                  </label>
                  <textarea
                    className="form-control"
                    id="otherInfo"
                    name="otherInfo"
                    value={formData.otherInfo}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-danger">
                  Edit Now
                </button>
              </form>
            </div>
          </div>
          <MyFooter />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditPropertyPage;

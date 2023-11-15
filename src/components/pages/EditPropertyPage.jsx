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
import no_property_pic from "../../assets/images/no_photo.jpg";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function EditPropertyPage() {
  const [productToEdit, setProductToEdit] = useState({});
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

  const totalSlots = 6;
  const loopArrayLength = totalSlots - formData.photos.length;

  // Create loopArray with the desired length
  const loopArray = Array.from({ length: loopArrayLength }).map(
    (_, index) => index
  );

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
    if (!formData.otherInfo.trim()) {
      validationErrors.otherInfo = "Description is required.";
    }

    if (!formData.area.toString().trim()) {
      validationErrors.area = "Area Size is required.";
    } else if (isNaN(Number(formData.area))) {
      validationErrors.area = "Area Size must be a number.";
    }

    if (!formData.bedrooms.toString().trim()) {
      validationErrors.bedrooms = "Number of rooms is required.";
    } else if (isNaN(Number(formData.bedrooms))) {
      validationErrors.bedrooms = "Number of rooms must be a number.";
    }
    if (!formData.bathrooms.toString().trim()) {
      validationErrors.bathrooms = "Number of rooms is required.";
    } else if (isNaN(Number(formData.bathrooms))) {
      validationErrors.bathrooms = "Number of rooms must be a number.";
    }

    if (!formData.price.toString().trim()) {
      validationErrors.price = "Price is required.";
    } else if (isNaN(Number(formData.price))) {
      validationErrors.price = "Price must be a number.";
    }

    if (formData.photos.length < 3) {
      validationErrors.photos = "Must upload at least 3 photos.";
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
          <div className="container mt-5 p-5">
            <h1 className="text-secondary text-center mb-4">Edit Your AD</h1>

            <div className="offset-2 col-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3 title">
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
                  {errors.adName && (
                    <div className="invalid-feedback">{errors.adName}</div>
                  )}
                </div>
                <div className="mb-3 Description">
                  <label htmlFor="otherInfo" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.otherInfo && "is-invalid"
                    }`}
                    id="otherInfo"
                    name="otherInfo"
                    value={formData.otherInfo}
                    onChange={handleChange}
                    style={{height:"7rem"}}
                  />
                  {errors.otherInfo && (
                    <div className="invalid-feedback">{errors.otherInfo}</div>
                  )}
                </div>

                <div className="row location&type mt-4">
                  {" "}
                  <div className="col-6 location">
                    <div className="mb-3 location">
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
                            <option
                              name="location"
                              key={index}
                              value={governorate}
                            >
                              {" "}
                              {governorate}{" "}
                            </option>
                          );
                        })}
                      </select>
                      {errors.governorate && (
                        <div className="invalid-feedback">
                          {errors.governorate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6 type">
                    <div className="mb-3 type">
                      <label htmlFor="type" className="form-label">
                        Type:
                      </label>
                      <select
                        className={`form-select`}
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
                  </div>
                </div>
                <div className="row area&bedrooms&bathrooms mt-4">
                  <div className="col-4 area">
                    <div className="mb-3 area">
                      <label htmlFor="area" className="form-label">
                        Area (m²):
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.area && "is-invalid"
                        }`}
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      />
                      {errors.area && (
                        <div className="invalid-feedback">{errors.area}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-4 bedrooms">
                    <div className="mb-3 bedrooms">
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
                      {errors.bedrooms && (
                        <div className="invalid-feedback">
                          {errors.bedrooms}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-4 bathrooms">
                    <div className="mb-3 bathrooms">
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
                      {errors.bathrooms && (
                        <div className="invalid-feedback">
                          {errors.bathrooms}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3 price ">
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
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>

                <div className="mb-3 photos">
                  <label htmlFor="photo" className="form-label">
                    Upload Photos (3 at least and up to 6):
                  </label>

                  <div className="container border border-1">
                    <h5>Selected Photos:</h5>
                    <div className="row mt-5">
                      {formData.photos.length > 0 && (
                        <>
                          {formData.photos.map((photo, index) => (
                            <div className="col-4 text-center">
                              <span key={index}>
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Selected Photo ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "82%",
                                    scale: ".9",
                                  }}
                                  className="mb-1"
                                />
                                <span
                                  style={{ scale: ".7" }}
                                  type="button"
                                  className="btn btn-danger fs-6 "
                                  onClick={() => removePhoto(index)}
                                >
                                  Remove
                                </span>
                              </span>
                            </div>
                          ))}
                        </>
                      )}

                      {loopArray.map((number, index) => (
                        <>
                          {" "}
                          <div className="col-4 text-center">
                            <span className="">
                              <img
                                src={no_property_pic}
                                alt={`Selected Photo`}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "",
                                  scale: ".9",
                                }}
                                className="mb-1"
                              />
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>

                  {errors.photos && (
                    <div className="text-danger mt-2">{errors.photos}</div>
                  )}
                  <input
                    type="file"
                    className="form-control mt-3"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>

                <button type="submit" className="btn btn-danger mt-3">
                  Post Your Ad
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

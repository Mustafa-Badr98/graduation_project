import React, { useState } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import { AddToUserProductListAction } from "../../store/actions/AddToUserProductList";
import { AddToProductListAction } from "../../store/actions/AddToProductList";
import { EditUserListAction } from "../../store/actions/EditUserList";
import { EditProductListAction } from "../../store/actions/EditProductList";

function EditPageForModal(props) {
  const localProductToEdit = props.productObject;
//   console.log(localProductToEdit);
//   console.log("hi")
  const LocalProductList = useSelector((state) => state.Products.productList);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    governorate: "",
    city: "",
    region: "",
    type: "",
    furnished: "no",
    area: "",
    rooms: "",
    price: "",
    photos: [],
    otherInfo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.photos.length + files.length > 10) {
      alert("You can upload a maximum of 10 photos.");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.title.trim()) {
      validationErrors.title = "Advertisement name is required.";
    }

    if (!formData.governorate.trim()) {
      validationErrors.governorate = "Governorate is required.";
    }

    if (!formData.city.trim()) {
      validationErrors.city = "City is required.";
    }

    if (!formData.region.trim()) {
      validationErrors.region = "Region is required.";
    }

    if (!formData.area.trim()) {
      validationErrors.area = "Area is required.";
    } else if (isNaN(Number(formData.area))) {
      validationErrors.area = "Area must be a number.";
    }

    if (!formData.rooms.trim()) {
      validationErrors.rooms = "Number of rooms is required.";
    } else if (isNaN(Number(formData.rooms))) {
      validationErrors.rooms = "Number of rooms must be a number.";
    }

    if (!formData.price.trim()) {
      validationErrors.price = "Price is required.";
    } else if (isNaN(Number(formData.price))) {
      validationErrors.price = "Price must be a number.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const editedAd = {
        id: localProductToEdit.id,
        title: formData.title,
        description: formData.otherInfo,
        location: formData.governorate + formData.city + formData.region,
        numOfBedrooms: formData.rooms,
        numOfBathrooms: "2",
        propertySize: formData.area,
        price: formData.price,
        type: formData.type,
        photo:
          "https://en.bailypearl.com/wp-content/uploads/2021/05/villa-la-croix-valmer-vue-aerienne-2-2560x1633.jpg",
        timeStamp: localProductToEdit.timeStamp,
      };
      dispatch(EditUserListAction(editedAd));
      dispatch(EditProductListAction(editedAd));

      // console.log("Form data:", formData);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="col-lg-10 ">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                AD Title:
              </label>
              <input
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              {errors.governorate && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="governorate" className="form-label">
                Governorate:
              </label>
              <input
                type="text"
                className={`form-control ${errors.governorate && "is-invalid"}`}
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              />
              {errors.governorate && (
                <div className="invalid-feedback">{errors.governorate}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className={`form-control ${errors.city && "is-invalid"}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="region" className="form-label">
                Region:
              </label>
              <input
                type="text"
                className={`form-control ${errors.region && "is-invalid"}`}
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              />
              {errors.region && (
                <div className="invalid-feedback">{errors.region}</div>
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
            {/* furnished input */}
            <div className="mb-3">
              <label className="form-label">Furnished:</label>
              <div>
                <label className="form-check-label mr-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="furnished"
                    value="yes"
                    checked={formData.furnished === "yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="furnished"
                    value="no"
                    checked={formData.furnished === "no"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
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
              {errors.area && (
                <div className="invalid-feedback">{errors.area}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="rooms" className="form-label">
                Number of Rooms:
              </label>
              <input
                type="text"
                className={`form-control ${errors.rooms && "is-invalid"}`}
                id="rooms"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                required
              />
              {errors.rooms && (
                <div className="invalid-feedback">{errors.rooms}</div>
              )}
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
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload Photos (up to 10):
              </label>
              <input
                type="file"
                className={`form-control`}
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileUpload}
                multiple
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
                            style={{ maxWidth: "14rem", maxHeight: "10rem" }}
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
              Post Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPageForModal;

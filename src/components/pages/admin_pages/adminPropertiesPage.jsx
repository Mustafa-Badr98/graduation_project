import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminPropertiesPage = () => {
  const storedAuthToken = localStorage.getItem("authToken");

  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allProperties, setAllProperties] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchByValue, setSearchByValue] = useState("title");
  const [searchByValueData, setSearchByValueData] = useState({
    title: "",
    id: "",
    price: "",
    location: "",
    type: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    if (searchByValue === "title") {
      setSearchByValueData({ title: e.target.value });
    }
    if (searchByValue === "id") {
      setSearchByValueData({ id: e.target.value });
    }
    if (searchByValue === "location") {
      setSearchByValueData({ location: e.target.value });
    }
    if (searchByValue === "price") {
      setSearchByValueData({ price: e.target.value });
    }
    if (searchByValue === "type") {
      setSearchByValueData({ type: e.target.value });
    }
  };

  const handelSearchByChange = (e) => {
    console.log(e.target.value);
    setSearchByValue(e.target.value);
  };

  const handelDeleteButton = (id) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this Property?."
      );
      if (userConfirmed) {
        console.log(id);
        console.log(storedAuthToken);
        axios
          .delete(`http://127.0.0.1:8000/api/properties/${id}`, {
            headers: {
              Authorization: `Token ${storedAuthToken}`,
            },
          })
          .then((res) => console.log(res))
          .then(() => get_properties());

        // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
      } else {
        console.log("Deletion canceled");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelSubmitSearch = () => {
    console.log(searchByValueData);

    axios
      .get("http://localhost:8000/api/properties/admin/filtered/", {
        params: {
          title__icontains: searchByValueData.title,
          id__icontains: searchByValueData.id,
          price__icontains: searchByValueData.price,
          location__icontains: searchByValueData.location,
          type__icontains: searchByValueData.type,
        },
      })
      .then((res) => {
        console.log(res);
        setAllProperties(res.data);
      });
  };

  const get_properties = () => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/properties/admin")
        .then((res) => {
          console.log(res.data);
          setAllProperties(res.data.properties);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(allProperties).length === 0) {
      get_properties();
    }
  }, [allProperties]);

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="container">
        <div className="row admin_header mt-5">
          <div className="offset-4 col-6">
            <h1>Admin Panel</h1>
          </div>
          <div className="row search-by-selector mb-2">
            <div className="offset-8 col-2">
              <label htmlFor="search_field ">Search By:</label>
              <select
                name="search_field"
                className="form-control"
                value={searchByValue}
                onChange={handelSearchByChange}
              >
                <option value="title">Property Title</option>
                <option value="id">ID</option>
                <option value="location">Location</option>
                <option value="price">Price</option>
                <option value="type">Type</option>
              </select>
            </div>
          </div>
          <div className="row search-bar">
            <div className="offset-8 col-2">
              <input
                name="searched_word"
                className="col-1 form-control border-end-0 border rounded-pill "
                type="text"
                value={searchValue}
                id="example-search-input"
                onChange={handelSearchChange}
              />
            </div>
            <span className="col-2">
              <button
                className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
                type="submit"
                onClick={handelSubmitSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="container border border-1 rounded  mt-5 p-5">
          <h4 className="mb-4">Properties:</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Owner</th>
                <th scope="col">Price</th>
                <th scope="col">N Offers</th>
                <th scope="col">Published at</th>
                <th scope="col">Type</th>
                <th scope="col">State</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allProperties.length > 0 ? (
                <>
                  {allProperties.map((property, index) => (
                    <tr key={index}>
                      <th scope="row"> {index}</th>
                      <td>
                        <span className="fw-bold">{property.id}</span>{" "}
                      </td>
                      <td>{property.title} </td>
                      <td> {property.seller.user_name}</td>
                      <td>{property.price} </td>
                      <td>{property.offers.length} </td>
                      <td>{property.created_at} </td>
                      <td>{property.type} </td>

                      <td>
                        {" "}
                        {property.state === "live" ? (
                          <div className="text-success">Live</div>
                        ) : (
                          <div className="text-danger">Sold</div>
                        )}
                      </td>

                      <td>
                        <button className="bg-body">
                          <i className="pt-2 fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                      <td className="">
                        <button className="bg-body">
                          <i
                            onClick={() => handelDeleteButton(property.id)}
                            className="pt-2 fa-solid fa-trash"
                            style={{ color: "#ff0f0f" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default AdminPropertiesPage;

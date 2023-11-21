import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AdminPropertyRowComp from "./adminPropertyRowComp";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [propertyPerPage] = useState(5);

  const indexOfLastProperty = currentPage * propertyPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertyPerPage;
  const currentProperty = allProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allProperties.length / propertyPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(allProperties.length / propertyPerPage);

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
      <div style={{ minHeight: "75vh" }} className="container">
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
        <div style={{minHeight:"410px"}}  className="container border border-1 rounded  mt-5 p-5">
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
                  {currentProperty.map((property, index) => (
                    <AdminPropertyRowComp key={index} property={property} refreshPage={get_properties} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
      <MyFooter />
    </>
  );
};

export default AdminPropertiesPage;

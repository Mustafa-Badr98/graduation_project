import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AdminUserRowComp from "./adminUserRowComp";

const AdminUsersPage = () => {
  const storedAuthToken = localStorage.getItem("authToken");
  const flag = useSelector((state) => state.Flag.flag);
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchByValue, setSearchByValue] = useState("user_name");
  const [searchByValueData, setSearchByValueData] = useState({
    user_name: "",
    id: "",
    email: "",
    phone: "",
    rating: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
    if (searchByValue === "user_name") {
      setSearchByValueData({ user_name: e.target.value });
    }
    if (searchByValue === "id") {
      setSearchByValueData({ id: e.target.value });
    }
    if (searchByValue === "phone") {
      setSearchByValueData({ phone: e.target.value });
    }
    if (searchByValue === "rating") {
      setSearchByValueData({ rating: e.target.value });
    }
    if (searchByValue === "email") {
      setSearchByValueData({ email: e.target.value });
    }
  };

  const handelSearchByChange = (e) => {
    setSearchByValue(e.target.value);
  };

  const handelSubmitSearch = () => {
    console.log(searchByValueData);

    axios
      .get("http://localhost:8000/api/filtered_users/", {
        params: {
          user_name__icontains: searchByValueData.user_name,
          id__icontains: searchByValueData.id,
          email__icontains: searchByValueData.email,
          mobile_phone__icontains: searchByValueData.phone,
          ratings__icontains: searchByValueData.rating,
        },
      })
      .then((res) => {
        console.log(res);
        setAllUsers(res.data);
      });
  };

  const get_users = () => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/users/")
        .then((res) => {
          console.log(res.data.users);
          setAllUsers(res.data.users);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(allUsers).length === 0) {
      get_users();
    }
  }, [searchByValue, flag,allUsers]);

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
                <option value="user_name">Username</option>
                <option value="id">ID</option>
                <option value="phone">Phone Number</option>
                <option value="rating">Rating</option>
                <option value="email">Email</option>
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
                type="button"
                onClick={handelSubmitSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="container border border-1 rounded  mt-5 p-5">
          <div className="row">
            <h4 className="col-4 mb-4">Users:</h4>{" "}
            <Link
              to="/add_admin_user"
              className="offset-6 col-2 h-25 btn btn-primary"
            >
              Add admin user
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Rating</th>
                <th scope="col">number of Ads</th>
                <th scope="col">Is Admin ?</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                <>
                  {currentUsers.map((user, index) => (
                    <AdminUserRowComp key={index} user={user} />
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

export default AdminUsersPage;

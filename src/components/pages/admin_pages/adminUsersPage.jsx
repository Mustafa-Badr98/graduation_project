import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const AdminUsersPage = () => {
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  useEffect(() => {
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
  }, []);

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="container">
        <div className="row admin_header mt-5">
          <div className="offset-4 col-6">
            <h1>Admin Panel</h1>
          </div>
          <div className="row search-by-selector mb-2">
            <div className="offset-8 col-2">
              <label for="search_field ">Search By:</label>
              <select name="search_field" class="form-control">
                <option value="username">Username</option>
                <option value="id">id</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
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
                class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
                type="submit"
              >
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="container border border-1 rounded  mt-5 p-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Rating</th>
                <th scope="col">number of Ads</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                <>
                  {allUsers.map((user, index) => (
                    <tr key={index}>
                      <th scope="row"> {index}</th>
                      <td>
                        <span className="fw-bold">{user.id}</span>{" "}
                      </td>
                      <td>{user.user_name} </td>
                      <td> {user.email}</td>
                      <td>{user.mobile_phone} </td>
                      <td>{user.avg_rating} </td>
                      <td>{user.properties_owned.length} </td>
                      <td> </td>

                      <td>
                        <a class="btn btn-dark w-100" href="">
                          Edit
                        </a>
                      </td>
                      <td>
                        <a class="btn btn-danger w-75" href="">
                          Delete
                        </a>
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

export default AdminUsersPage;

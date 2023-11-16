import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const AdminRatingsPage = () => {
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allRatings, setAllRatings] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/allRatings/")
        .then((res) => {
          console.log(res.data.ratings);
          setAllRatings(res.data.ratings);
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
              <label htmlFor="search_field ">Search By:</label>
              <select name="search_field" className="form-control">
                <option value="property">commented on user</option>
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
                className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
                type="submit"
              >
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="container border border-1 rounded  mt-5 p-5">
          <h4 className="mb-4">Ratings:</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">rated user</th>
                <th scope="col">rated by user</th>
                <th scope="col">rating</th>
                <th scope="col">rated at</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allRatings.length > 0 ? (
                <>
                  {allRatings.map((rating, index) => (
                    <tr key={index}>
                      <th scope="row"> {index}</th>
                      <td>
                        <span className="fw-bold">{rating.id}</span>{" "}
                      </td>
                      <td>{rating.user} </td>
                      <td> {rating.rated_by}</td>
                      <td>
                        <span className="text-danger">{rating.rating} </span>
                      </td>
                      <td>{rating.created_at} </td>
                      <td> </td>
                      <td> </td>

                      <td>
                        <button className="bg-body">
                          <i className="pt-3 fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                      <td className="">
                        <button className="bg-body">
                          <i
                            className="pt-3 fa-solid fa-trash"
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

export default AdminRatingsPage;

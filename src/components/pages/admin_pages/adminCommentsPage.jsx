import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import AdminCommentRowComp from "./adminCommentRowComp";

const AdminCommentsPage = () => {
  const storedAuthToken = localStorage.getItem("authToken");

  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allComments, setAllComments] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const handelDeleteButton = (id) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this Comment?."
      );
      if (userConfirmed) {
        console.log(id);
        console.log(storedAuthToken);
        const response = axios
          .delete(`http://127.0.0.1:8000/api/delete_comment/admin/${id}`, {
            headers: {
              Authorization: `Token ${storedAuthToken}`,
            },
          })
          .then((res) => console.log(res))
          .then(() => get_comments());

        // .then((res) => dispatch(RefreshUserDataAction(res.data.user)));
      } else {
        console.log("Deletion canceled");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const get_comments = () => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/comments/")
        .then((res) => {
          console.log(res.data.comments);
          setAllComments(res.data.comments);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(allComments).length === 0) {
      get_comments();
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
                <option value="comment_user">comment user</option>
                <option value="content">content</option>
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
          <h4 className="mb-4">Comments:</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">commented on user</th>
                <th scope="col">comment user</th>
                <th scope="col">content</th>
                <th scope="col">commented at</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allComments.length > 0 ? (
                <>
                  {allComments.map((comment, index) => (
                    <AdminCommentRowComp key={index} comment={comment} />
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

export default AdminCommentsPage;

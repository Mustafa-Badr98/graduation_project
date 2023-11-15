import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AdminHomePage = () => {
  const user = useSelector((state) => state.currentUSER.currentUser);

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="container">
        <div className="row admin_header mt-5">
          <div className="offset-4 col-6">
            <h1>Admin Panel</h1>
          </div>
        </div>
        <div className="container border border-1 rounded  mt-5 p-5">
          <div className="row content-table">
            <div className="offset-2 col-4 mt-2 firstCol ">
              <div className="users">
                {" "}
                <h4>Authentication and users:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="/admin_panel/users">
                      users
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="users-comments mt-5">
                {" "}
                <h4>comments:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="">
                      users comments
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="users-rating mt-5">
                {" "}
                <h4>Ratings:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="">
                      users Ratings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="offset-1 col-4 mt-2 secondeCol ">
              <div className="Properties ">
                {" "}
                <h4>Properties:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="">
                      Users Properties
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="offers mt-5">
                {" "}
                <h4>Offers:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="">
                      users offers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="deals mt-5">
                {" "}
                <h4>deals:</h4>
                <ul>
                  <li className="fs-5">
                    {" "}
                    <Link style={{ textDecoration: "none" }} className="" to="">
                      users deals
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default AdminHomePage;

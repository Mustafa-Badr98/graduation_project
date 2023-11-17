import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const MyFooter = () => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          marginTop: "70px",
          backgroundColor: "rgb(43, 43, 43)",
          minHeight: "25vh",
          width: "100%",
        }}
      >
        <div className="container">
          <div className="row pt-5">
            <div className="col-3 ">
              <h3 style={{ color: "white" }}>GET IN TOUCH</h3>
              <div className="pb-2 mt-2">
                <i
                  style={{ color: "white" }}
                  className="fa-regular fa-envelope"
                ></i>
                
                <span className="fs-6 pt-2 ms-2" style={{ color: "white" }}>
                  RealtorSite@hotmail.com
                </span>
              </div>
              <div>
                <i
                  style={{ color: "white" }}
                  className="fa-regular fa-address-book"
                ></i>
                
                <span className="pt-2 ms-2" style={{ color: "white" }}>
                  717-555-1234
                </span>
              </div>
            </div>
            <div className="offset-1 col-3 mt-4 ps-5 ">
              <button
                style={{ borderRadius: "20px" }}
                className="btn btn-secondary"
              >
                Contact Us
              </button>
            </div>
            <div className="col-4 mt-4 ">
              {/* <div className="d-flex justify-content-center ">
                <i
                  className="fa-brands fa-linkedin pe-2"
                  style={{ color: "white", fontSize: "2rem" }}
                ></i>
                <i
                  className="fa-brands fa-facebook"
                  style={{ color: "white", fontSize: "2rem" }}
                ></i>
                <i
                  className="fa-brands fa-twitter ps-2"
                  style={{ color: "white", fontSize: "2rem" }}
                ></i>
              </div> */}
              <div className="row">
                <div className="col">
                  <div
                    style={{ color: "white", fontSize: "2rem" }}
                    className="fs-4 ms-5 mt-3"
                  >
                    Copyright © 2023
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFooter;

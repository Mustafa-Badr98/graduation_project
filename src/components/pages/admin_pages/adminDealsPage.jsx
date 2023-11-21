import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyFooter from "../../static/footer";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const AdminDealsPage = () => {
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [allDeals, setAllDeals] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [dealPerPage] = useState(5);

  const indexOfLastDeal = currentPage * dealPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealPerPage;
  const currentDeals = allDeals.slice(indexOfFirstDeal, indexOfLastDeal);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDeals.length / dealPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(allDeals.length / dealPerPage);

  const handelSearchChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/deals/")
        .then((res) => {
          console.log(res.data.Deals);
          setAllDeals(res.data.Deals);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        <div
          style={{ minHeight: "410px" }}
          className="container border border-1 rounded  mt-5 p-5"
        >
          <h4 className="mb-4">Deals:</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Buyer</th>
                <th scope="col">Seller</th>
                <th scope="col">Property</th>
                <th scope="col">Deal amount</th>
                <th scope="col">Done at</th>
             
               
              </tr>
            </thead>
            <tbody>
              {allDeals.length > 0 ? (
                <>
                  {currentDeals.map((deal, index) => (
                    <tr key={index}>
                      <th scope="row"> {index}</th>
                      <td>
                        <span className="fw-bold">{deal.id}</span>{" "}
                      </td>
                      <td>{deal.buyer.user_name} </td>
                      <td> {deal.seller.user_name}</td>
                      <td> {deal.property.title}</td>

                      <td>
                        <span className="text-danger">{deal.price} </span>
                        <span className="ms-1">EGP</span>
                      </td>
                      <td>{deal.created_at} </td>
                      
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

export default AdminDealsPage;

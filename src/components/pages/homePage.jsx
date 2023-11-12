


import React, { useEffect, useState } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../static/heroSection";
import NothingFoundAlert from "../static/nothingFoundAlert";
import LoadingSpinner from "../static/loadingSpinner";
import ListingCard from "../static/listingCard";
import { AddToProductListAction } from "../../store/actions/AddToProductList";
import RateComp from "../static/RateComp";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import { IsLoadingAction } from "../../store/actions/ISLoadingAction";

const HomePage = () => {
  const localIsLoading = useSelector((state) => state.IsLOADING.isLoading);
  const products = useSelector((state) => state.Products.productList);
  const isResultFound = useSelector((state) => state.Products.found);

  const dispatch = useDispatch();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(IsLoadingAction(false));
  }, [products]);

  return (
    <>
      <HeroSection />
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <h2 className="fw-bold">Check our Listings</h2>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {localIsLoading ? (
            <LoadingSpinner />
          ) : (
            currentItems.map((item, index) => (
              <ListingCard key={index} productObject={item} />
            ))
          )}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="container mt-3 text-center">
        <div className="row justify-content-center ">
          <div className="col-12">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </a>
              </li>
              {Array.from(
                { length: Math.ceil(products.length / itemsPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      href="#!"
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(products.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isResultFound === false && <NothingFoundAlert />}

      <MyFooter />
    </>
  );
};

export default HomePage;




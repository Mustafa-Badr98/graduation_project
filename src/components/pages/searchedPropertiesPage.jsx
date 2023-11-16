import React, { useEffect } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../static/heroSection";
import NothingFoundAlert from "../static/nothingFoundAlert";
import LoadingSpinner from "../static/loadingSpinner";
import ListingCard from "../static/listingCard";

const SearchedPropertiesPage = () => {
  const localIsLoading = useSelector((state) => state.IsLOADING.isLoading);
  const searchedProducts = useSelector(
    (state) => state.ProductsSearched.productSearchedList
  );

  const dispatch = useDispatch();

  useEffect(() => {}, [searchedProducts]);

  return (
    <>
      <HeroSection />
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <h2 className="fw-bold ">Your search Result</h2>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {localIsLoading ? (
            <LoadingSpinner />
          ) : searchedProducts.length === 0 ? (
            <>
            
            <NothingFoundAlert />
            <div style={{height:"300px"}}></div>
            </>
          ) : (
            searchedProducts.map((item, index) => {
              return <ListingCard key={index} productObject={item} />;
            })
          )}
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default SearchedPropertiesPage;

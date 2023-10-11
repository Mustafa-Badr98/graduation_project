import React, { useEffect } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../static/heroSection";
import NothingFoundAlert from "../static/nothingFoundAlert";
import LoadingSpinner from "../static/loadingSpinner";
import ListingCard from "../static/listingCard";
import { AddToProductListAction } from "../../store/actions/AddToProductList";
import RateComp from "../static/RateComp";

const HomePage = () => {
  const localIsLoading = useSelector((state) => state.IsLOADING.isLoading);
  const products = useSelector((state) => state.Products.productList);
  const isResultFound = useSelector((state) => state.Products.found);
  // console.log(isResultFound);

  useEffect(() => {}, [products]);
  console.log(products);
  return (
    <>
   
      <HeroSection />
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <h2 className="fw-bold ">Check our Listings</h2>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {localIsLoading ? (
            <LoadingSpinner />
          ) : (
            products.map((item, index) => {
              return <ListingCard key={index} productObject={item} />;
            })
          )}
        </div>
      </div>

      {isResultFound === false && <NothingFoundAlert />}

      <MyFooter />
    </>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../static/productCard";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import HeroSection from "../static/heroSection";
import SearchComp from "../static/SearchComp";
import FilterComp from "../static/FilterComp";

const HomePage = () => {
  const localIsLoading = useSelector((state) => state.IsLOADING.isLoading);

  const products = useSelector((state) => state.Products.productList);
  const isResultFound = useSelector((state) => state.Products.found);
  // console.log(isResultFound);

  useEffect(() => {}, [products]);
  // console.log(products);
  return (
    <>
      <HeroSection />
      <div className="container mt-5">
        <div className="row">
          <div className="offset-3 col-5">
            <SearchComp />
          </div>
          <div className="offset-1 col-3">
            <FilterComp />
          </div>
        </div>
      </div>

      {localIsLoading ? (
        <>
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>{" "}
        </>
      ) : (
        products.map((item, index) => {
          return <ProductCard key={index} productObject={item} />;
        })
      )}
      {isResultFound === false && (
        <>
          <div className="container mt-5">
            <div className="row">
              <div className="offset-2 col-7">
                <div className="alert alert-warning" role="alert">
                  <h4 className="alert-heading">Nothing Found!</h4>
                  <p>Try Searching For more Relevant Titles.</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <MyFooter />
    </>
  );
};

export default HomePage;

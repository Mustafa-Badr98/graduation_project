import React, { useEffect } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../static/productCard";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import HeroSection from "../static/heroSection";
import SearchComp from "../static/SearchComp";
import FilterComp from "../static/FilterComp";
import NothingFoundAlert from "../static/nothingFoundAlert";
import LoadingSpinner from "../static/loadingSpinner";

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
        <LoadingSpinner />
      ) : (
        products.map((item, index) => {
          return <ProductCard key={index} productObject={item} />;
        })
      )}
      {isResultFound === false && <NothingFoundAlert />}

      <MyFooter />
    </>
  );
};

export default HomePage;

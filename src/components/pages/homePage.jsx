import React, { useEffect } from "react";
import MyFooter from "../static/footer";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../static/productCard";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import HeroSection from "../static/heroSection";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProductsListAction());
  }, []);
  const products = useSelector((state) => state.Products.productList);
  console.log(products);
  return (
    <>
      <HeroSection />
      {products.map((item, index) => {
        return <ProductCard key={index} productObject={item} />;
      })}

      <MyFooter />
    </>
  );
};

export default HomePage;

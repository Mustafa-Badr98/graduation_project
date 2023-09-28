import React, { useEffect } from "react";
import ProductCard from "../static/productCard";
import { useSelector } from "react-redux";
import MyFooter from "../static/footer";
import WishPageCard from "../static/WishPAgeCard";

const WishListPage = () => {
  const wishList = useSelector((state) => state.WishLIST.wishList);

  return (
    <>
      <div style={{ minHeight: "75vh" }}>
        {wishList.map((product, index) => {
          return <WishPageCard key={index} productObject={product} />;
        })}
      </div>

      <MyFooter />
    </>
  );
};

export default WishListPage;

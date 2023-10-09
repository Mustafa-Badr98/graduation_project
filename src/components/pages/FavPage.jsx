import React, { useEffect } from "react";
import ProductCard from "../static/productCard";
import { useSelector } from "react-redux";
import MyFooter from "../static/footer";
import FavPageCard from "../static/FavPageCard";
import ListingCard from "../static/listingCard";

const FavPage = () => {
  const favChanger = useSelector((state) => state.FavCOUNT.favCount);

  function GetDataFromSession() {
    let holderArray = [];
    const keys = Object.keys(sessionStorage);
    for (const key of keys) {
      const value = sessionStorage.getItem(key);
      let parsedData = JSON.parse(value);
      holderArray.push(parsedData);
    }
    return holderArray;
  }

  let sessionStorageData = GetDataFromSession();
  // console.log(sessionStorageData);

  useEffect(() => {
    sessionStorageData = GetDataFromSession();
  }, [favChanger]);
  // console.log(sessionStorageData);
  return (
    <>
    <h3 className="p-4">Your Favorites :</h3>
      <div style={{ minHeight: "75vh" }}>
        <div className="container">
          <div className="row">
            {sessionStorageData.map((product, index) => {
              return <ListingCard key={index} productObject={product} />;
            })}
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default FavPage;

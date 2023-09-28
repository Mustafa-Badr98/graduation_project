import React, { useEffect } from "react";
import ProductCard from "../static/productCard";
import { useSelector } from "react-redux";
import MyFooter from "../static/footer";
import FavPageCard from "../static/FavPageCard";

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
      <div style={{minHeight:"75vh"}}>
        {sessionStorageData.map((product, index) => {
          return <FavPageCard key={index} productObject={product} />;
        })}
      </div>

      <MyFooter />
    </>
  );
};

export default FavPage;
